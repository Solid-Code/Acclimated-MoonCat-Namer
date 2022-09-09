This Solidity environment uses [Hardhat](https://hardhat.org/) for compiling and testing. Therefore, the general development flow would be:


To run and test:
```bash
git clone https://github.com/Solid-Code/Acclimated-MoonCat-Namer.git
cd Acclimated-MoonCat-Namer
cp dotenvTemplate.txt .env
vim .env   # <== Set API_URL to Execution Client API endpoint
npm install
npx hardhat test
...
```
