# File System Implementation

## File System Structure

The file system is represented using the following classes:

### Item

Properties: name, parent
Methods: get and set name, get and set parent

### File

Extends Item
Properties: type, mimeType, textContent, source
Methods: get and set textContent, get and set source, get type and mimeType, get copy

### Directory

Extends Item
Properties: type, children (stored in a Map)
Methods: get content, get type, get copy, hasItem, insertItem, getItem, removeItem

### File System

Properties: self (root directory), currentDirectory, currentDirectoryPath
Methods: createFile, createDirectory, insertItem, getItem, hasItem, removeItem, renameItem, copyItem, printCurrentDirectory, openDirectory, goBack, goBackToDirectory, findItem, findAllItems, moveItemTo

## Data Structures

Map is used to store the children of a directory.
Classes like Item, File, and Directory encapsulate the properties and behaviors of items.

## Commands

### mkdir abc :Create a directory abc

Output: Directory "abc" created successfully.

### cd abc

Output: Changed directory to root/abc.

### echo 'I am a text file' > file.txt

Output: File file.txt created successfully.

### cat file.txt

Output: Contents of file.txt: I am a text file.

### ls root/abc

Output: [F]->file.txt

### cd ..

Output: Changed directory to root

### touch newFile.txt

Output: File "newFile.txt" created successfully

### ls root

Output: [D]-> abc
[F]-> newFile.txt

### mv newFile.txt abc

Output: Moved File "newFile.txt" to abc.

### echo "I am abc" > abc.txt

### cp abc.txt abc

Copied File "abc.txt" to abc

### rm abc.txt

Removed File "abc.txt"
