class Item {
  #name = '';
  #parent = null;

  constructor(name) {
    if (this.constructor.name === 'Item') {
      throw new Error('Item class is Abstract. It can only be extended');
    }

    this.name = name;
  }

  get path() {
    if (this.parent) {
      return `${this.parent.path}/${this.name}`;
    }

    return this.name;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (!newName || typeof newName !== 'string' || !newName.trim().length) {
      throw new Error('Item name must be a non empty string');
    }

    if (newName.includes('/')) {
      throw new Error('Item name contains invalid symbol');
    }

    if (this.parent && this.parent.hasItem(newName)) {
      throw new Error(
        `Item with name of "${newName}" already exists in this directory`
      );
    }

    this.#name = newName.trim();
  }

  get parent() {
    return this.#parent;
  }

  set parent(newParent) {
    if (newParent !== this.#parent) {
      const prevParent = this.#parent;
      this.#parent = newParent;

      if (prevParent) {
        prevParent.removeItem(this.name);
      }

      if (newParent) {
        newParent.insertItem(this);
      }
    }
  }
}

module.exports = Item;
