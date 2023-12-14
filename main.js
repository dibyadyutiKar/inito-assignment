const FileSystem = require('./filesystem');
const handleCommand = require('./commands');
const readline = require('readline');
const File = require('./file');
const Directory = require('./directory');

const fs = new FileSystem();

// Helper function to read user input
function readInput(prompt) {
  process.stdout.write(prompt + ': ');
  return new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}
// Main loop
(async () => {
  while (true) {
    const command = await readInput('Enter command:');
    await handleCommand(command);
  }
})();
