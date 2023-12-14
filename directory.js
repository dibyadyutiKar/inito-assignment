const Item = require('./item');
const File = require('./file');

const DIRECTORY_TYPE = {
  DEFAULT: 'DEFAULT',
};

class Directory extends Item {
  #type = DIRECTORY_TYPE.DEFAULT;
  #children = new Map();

  constructor(name = '', type = DIRECTORY_TYPE.DEFAULT) {
    super(name || 'un-named directory');
    this.#type = DIRECTORY_TYPE[type] ? type : DIRECTORY_TYPE.DEFAULT;
  }

  get content() {
    return Array.from(this.#children.values());
  }

  get type() {
    return this.#type;
  }

  get copy() {
    const dirCopy = new Directory(`${this.name} copy`, this.type);

    this.content.forEach((item) => {
      const itemCopy = item.copy;
      itemCopy.name = item.name;
      dirCopy.insertItem(itemCopy);
    });

    return dirCopy;
  }

  hasItem(itemName) {
    return this.#children.has(itemName);
  }

  insertItem(item) {
    if (this.hasItem(item.name)) return true;

    if (item === this) throw new Error('Directory cannot contain itself');

    let parent = this.parent;

    while (parent !== null) {
      if (parent === item) {
        throw new Error('Directory cannot contain one of its ancestors');
      }
      parent = parent.parent;
    }

    this.#children.set(item.name, item);
    item.parent = this;

    return this.hasItem(item.name);
  }

  getItem(itemName) {
    return this.#children.get(itemName) || null;
  }

  removeItem(itemName) {
    const item = this.getItem(itemName);

    if (item) {
      this.#children.delete(itemName);
      item.parent = null;
    }

    return !this.hasItem(itemName);
  }
}

module.exports = Directory;
