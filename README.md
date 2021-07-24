This Solidity environment uses [Hardhat](https://hardhat.org/) for compiling and testing. Therefore, the general develpment flow would be:

```bash
cp dotenvTemplate.txt .env
vim .env   # <== Set API_URL to Alchemy API endpoint
npm install
npx hardhat --network hardhat node

npx hardhat run --network local scripts/deploy.js
npx hardhat test --network local test/happy-path.js
npx hardhat test --network docker test/delayed-wrap.js
...
```

## Docker
To run this environment inside a Docker container (for the Node runtime environment), you can do:

```bash
cp dotenvTemplate.txt .env
vim .env   # <== Set API_URL to Alchemy API endpoint
docker network create mooncats
docker run -it --rm -p 8545:8545 --network=mooncats --net-alias "hardhat-node" -v ${PWD}:/app -w /app node bash

npm install
npx hardhat --network hardhat node
```

and in another shell do

```bash
docker run -it --rm --network=mooncats -v ${PWD}:/app -w /app node bash

npx hardhat run --network docker scripts/deploy.js
npx hardhat test --network docker test/happy-path.js
npx hardhat test --network docker test/delayed-wrap.js
...
```

In general, what those commands are doing is `docker run -it` creates a one-off container, starts it up, and prepares it as an interactive terminal. `--rm` means as soon as you quit the container, it will delete itself. `-p 8545:8545` on the node-running container maps its 8545 port to your actual workstation, so you can connect to http://localhost:8545 to hit that RPC endpoint if you want to. If your port 8545 is already in use, modify that command to something like `-p 9545:8545` (assuming port 9545 is open on your workstation). `-v ${PWD}:/app -w /app` mounts the current folder (as echoed by the `PWD` environment variable) as `/app` inside the container and sets the working directory (the directory you'll start in when the container starts up) to `/app`. On a linux-like environment, `-v ./:/app -w /app` should accomplish the same thing.

`docker network create mooncats` creates an internal network segment, which then using the `--network=mooncats` flag has containers join (so they can see each other; otherwise Docker sandboxing keeps them from interacting with each other). We give the node-running container a `--net-alias "hardhat-node"` flag which adds a "hosts" file entry for that container to all other containers in that network segment. Hence the other Docker container in the `mooncats` network can connect to it via `http://hardhat-node:8545`, which is what the `docker` network configuration in `hardhat.config.js` does.