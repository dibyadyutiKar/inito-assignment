const FileSystem = require('./filesystem');
const fs = new FileSystem();
const File = require('./file');
const Directory = require('./directory');

// Function to handle user commands
async function handleCommand(command) {
  const parts = command.split(' ');
  const action = parts[0];
  const args = parts.slice(1);

  try {
    switch (action) {
      case 'mkdir':
        const newDir = fs.createDirectory(args[0]);
        if (newDir) {
          console.log(`Directory "${args[0]}" created successfully.`);
        } else {
          console.log(`Failed to create directory "${args[0]}".`);
        }
        break;
      case 'cd':
        const targetDirPath = args[0] || '';

        if (targetDirPath === '..') {
          // Move to parent directory
          const parentDir = fs.goBack();
          if (parentDir) {
            console.log(
              `Changed directory to: [${fs.currentDirectoryPath.join('/')}]`
            );
          } else {
            console.log(`Already at the root directory.`);
          }
        } else if (targetDirPath === '~') {
          // Move to root directory
          fs.openDirectory('/');
          console.log(
            `Changed directory to: [${fs.currentDirectoryPath.join('/')}]`
          );
        } else {
          // Move to the specified directory
          const targetDir = fs.openDirectory(targetDirPath);
          if (targetDir) {
            console.log(
              `Changed directory to: [${fs.currentDirectoryPath.join('/')}]`
            );
          } else {
            console.log(`Directory not found: ${targetDirPath}`);
          }
        }
        break;
      case 'ls':
        const dirPath = args[0] || '';
        const listDir = fs.openDirectory(dirPath);
        if (listDir) {
          listDir.content.forEach((item) => {
            console.log(
              `[${item.constructor.name.substring(0, 1)}]-> ${item.name}`
            );
          });
        } else {
          console.log(`Directory not found: ${dirPath}`);
        }
        break;

      case 'cat':
        const fileNameCat = args[0];
        const fileCat = fs.getItem(fileNameCat);
        if (fileCat && fileCat instanceof File) {
          console.log(`Contents of ${fileNameCat}:`);
          console.log(fileCat.textContent);
        } else {
          console.log(`File not found: ${fileNameCat}`);
        }
        break;

      case 'touch':
        const fileNameTouch = args[0];
        const newFileTouch = fs.createFile(fileNameTouch);
        if (newFileTouch) {
          console.log(`File "${fileNameTouch}" created successfully.`);
        } else {
          console.log(`Failed to create file "${fileNameTouch}".`);
        }
        break;
      case 'echo':
        const text = args.slice(0, -2).join(' ');
        const fileNameEcho = args[args.length - 1];

        // Check if the file already exists
        const fileExists = fs.hasItem(fileNameEcho);

        if (fileExists) {
          console.log(`File "${fileNameEcho}" already exists. `);
        } else {
          const fileEcho = fs.createFile(fileNameEcho, text);
          if (fileEcho) {
            console.log(`Text written to "${fileNameEcho}" successfully.`);
          } else {
            console.log(`Failed to write text to "${fileNameEcho}".`);
          }
        }
        break;

      case 'mv':
        const sourcePath = args[0];
        const destinationPath = args[1];
        const itemToMove = fs.getItem(sourcePath);
        const destinationDir = fs.getItem(destinationPath);

        if (
          itemToMove &&
          destinationDir &&
          destinationDir instanceof Directory
        ) {
          destinationDir.insertItem(itemToMove);
          console.log(
            `Moved ${itemToMove.constructor.name} "${itemToMove.name}" to ${destinationPath}.`
          );
        } else {
          console.log(
            `Move operation failed. Check source and destination paths.`
          );
        }
        break;

      // case 'mv':
      //   const sourcePath = args[0];
      //   const destinationPath = args[1];
      //   const itemToMove = fs.getItem(sourcePath);
      //   const destinationDir = fs.getItem(destinationPath);

      //   console.log(`Source item: ${itemToMove ? itemToMove.name : 'null'}`);
      //   console.log(
      //     `Destination directory: ${
      //       destinationDir ? destinationDir.name : 'null'
      //     }`
      //   );
      //   console.log(`Current directory: ${fs.currentDirectoryPath.join('/')}`);

      //   if (
      //     itemToMove &&
      //     destinationDir &&
      //     destinationDir instanceof Directory
      //   ) {
      //     const destinationPathWithItem = `${destinationPath}/${itemToMove.name}`;
      //     destinationDir.insertItem(itemToMove);
      //     console.log(
      //       `Moved ${itemToMove.constructor.name} "${itemToMove.name}" to ${destinationPathWithItem}.`
      //     );
      //   } else {
      //     console.log(
      //       `Move operation failed. Check source and destination paths.`
      //     );
      //   }
      //   break;

      case 'cp':
        const sourcePathCp = args[0];
        const destinationPathCp = args[1];
        const itemToCopy = fs.getItem(sourcePathCp);
        const destinationDirCp = fs.getItem(destinationPathCp);

        if (
          itemToCopy &&
          destinationDirCp &&
          destinationDirCp instanceof Directory
        ) {
          const copiedItem = itemToCopy.copy;
          destinationDirCp.insertItem(copiedItem);
          console.log(
            `Copied ${itemToCopy.constructor.name} "${itemToCopy.name}" to ${destinationPathCp}.`
          );
        } else {
          console.log(
            `Copy operation failed. Check source and destination paths.`
          );
        }
        break;

      case 'rm':
        const itemPathRm = args[0];
        const itemToRemove = fs.getItem(itemPathRm);

        if (itemToRemove) {
          const removed = fs.removeItem(itemPathRm);
          if (removed) {
            console.log(
              `Removed ${itemToRemove.constructor.name} "${itemToRemove.name}".`
            );
          } else {
            console.log(
              `Failed to remove ${itemToRemove.constructor.name} "${itemToRemove.name}".`
            );
          }
        } else {
          console.log(`Item not found: ${itemPathRm}`);
        }
        break;

      // ... (add more commands as needed)

      default:
        console.log(`Unknown command: ${action}`);
        break;
    }
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = handleCommand;
