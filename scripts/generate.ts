import { exec } from "child_process";
import { camelToOtherCase } from "../src/common/utils/converter";

// Helper function to run shell commands
const runCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Get arguments from CLI
const [moduleName] = process.argv.slice(2);

if (!moduleName) {
  console.error("Please provide a module name as an argument.");
  process.exit(1);
}

// Main function to automate generation
const generateModule = async () => {
  const kebabCase = camelToOtherCase(moduleName, "-");

  const commands = [
    `nest g module modules/${moduleName}`,
    `nest g class models/entities/${moduleName}/${kebabCase}.entity --flat`,
    `nest g controller modules/${moduleName}/controllers/${kebabCase} --flat`,
    `nest g class modules/${moduleName}/dto/create-${kebabCase}.dto --flat`,
    `nest g class modules/${moduleName}/dto/update-${kebabCase}.dto --flat`,
    `nest g service modules/${moduleName}/services/${kebabCase} --flat`,
    `nest g class modules/${moduleName}/repositories/${kebabCase}.repositories --flat`,
    `sequelize migration:create --name create-${kebabCase}-table`,
  ];

  try {
    console.log(`Generating ${moduleName} module...`);
    for (const command of commands) {
      console.log(`Running: ${command}`);
      await runCommand(command);
    }
    console.log("Generation complete!");
  } catch (err) {
    console.error("Error during generation:", err);
  }
};

generateModule();
