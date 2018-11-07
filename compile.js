const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

// Remove build folder.
fs.removeSync(buildPath);

const eventTesterPath = path.resolve(__dirname, "contracts", "EventTester.sol");

const input = {
  sources: {
    "EventTester.sol": fs.readFileSync(eventTesterPath, "utf8"),
  }
}

const output = solc.compile(input, 1);
console.log('o', output, output.contracts);
const contracts = output.contracts;
fs.ensureDirSync(buildPath);

for (let contract in contracts) {
  const filename = contract.split(".")[0];
  fs.outputJsonSync(
    path.resolve(buildPath, `${filename}.json`),
    contracts[contract]
  );
}

console.log('compile successful!');
