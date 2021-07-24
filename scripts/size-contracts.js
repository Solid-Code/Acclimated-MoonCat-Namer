const hre = require('hardhat');

async function main() {
  const contracts = [];

  for (let name of await hre.artifacts.getAllFullyQualifiedNames()) {
    const { deployedBytecode } = await hre.artifacts.readArtifact(name);
    const size = Buffer.from(
      deployedBytecode.replace(/__\$\w*\$__/g, '0'.repeat(40)).slice(2),
      'hex'
    ).length;
    let shortName = name.split(':').pop();
    contracts.push({ name, shortName, size });
  }

  contracts
    .filter(c => c.size > 0)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(c => {
      console.log(`${c.name} => ${c.size.toLocaleString()} bytes`);
    });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
