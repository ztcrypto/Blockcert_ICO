// Step 1: Get a contract into my application
const fs = require('fs')
var Web3 = require('web3');
const ethers = require('ethers');
const solc = require('solc');
const path = require('path')
var web3 = new Web3();

/**
 * Makes sure that the build folder is deleted, before every compilation
 * @returns {*} - Path where the compiled sources should be saved.
 */
function compilingPreperations() {
    const buildPath = path.resolve(__dirname, 'contracts');
    //fs.removeSync(buildPath);
    //fs.unlinkSync(buildPath);
    return buildPath;
}

/**
 * Returns and Object describing what to compile and what need to be returned.
 */
function createConfiguration() {
    return {
        language: 'Solidity',
        sources: {
            'Owned.sol': {
                content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'Owned.sol'), 'utf8')
            },
            'BCertin.sol': {
                content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'BCertin.sol'), 'utf8')
            }
        },
        settings: {
            outputSelection: { // return everything
                '*': {
                    '*': ['*']
                }
            }
        }
    };
}

/**
 * Compiles the sources, defined in the config object with solc-js.
 * @param config - Configuration object.
 * @returns {any} - Object with compiled sources and errors object.
 */
function compileSources(config) {
    try {
        //console.log(config)
        //console.log( solc.compile(config) );
        
        //console.log( solc.compile(JSON.stringify(config)) );
        importFile = getImports('IERC20Token.sol');
        x =  solc.compile(config,importFile)
        console.log(x);
        return JSON.parse(solc.compile(config, getImports('IERC20Token.sol')));
    } catch (e) {
        console.log(e);
    }
}

/**
 * Searches for dependencies in the Solidity files (import statements). All import Solidity files
 * need to be declared here.
 * @param dependency
 * @returns {*}
 */
function getImports(dependency) {
    console.log('Searching for dependency: ', dependency);
    switch (dependency) {
        case 'IERC20Token.sol':
            return { contents: fs.readFileSync(path.resolve(__dirname, 'contracts/interfaces', 'IERC20Token.sol'), 'utf8')};
        case 'IOwned.sol':
            return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts/interfaces', 'IOwned.sol'), 'utf8')};
        default:
            return {error: 'File not found'}
    }
}

/**
 * Shows when there were errors during compilation.
 * @param compiledSources
 */
function errorHandling(compiledSources) {
    if (!compiledSources) {
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n', 'NO OUTPUT');
    } else if (compiledSources.errors) { // something went wrong.
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n');
        compiledSources.errors.map(error => console.log(error.formattedMessage));
    }
}

/**
 * Writes the contracts from the compiled sources into JSON files, which you will later be able to
 * use in combination with web3.
 * @param compiled - Object containing the compiled contracts.
 * @param buildPath - Path of the build folder.
 */
function writeOutput(compiled, buildPath) {
    fs.ensureDirSync(buildPath);

    for (let contractFileName in compiled.contracts) {
        const contractName = contractFileName.replace('.sol', '');
        console.log('Writing: ', contractName + '.json');
        fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.json'),
            compiled.contracts[contractFileName][contractName]
        );
    }
}

// Workflow

const buildPath = compilingPreperations();
const config = createConfiguration();
const compiled = compileSources(config);
errorHandling(compiled);
//writeOutput(compiled, buildPath);