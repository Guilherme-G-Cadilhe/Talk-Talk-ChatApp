
class Storage {
  setItem(key, value) {
    if (!value) return;
    localStorage.setItem(key, JSON.stringify(value));
    return this;
  }

  getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  }
}

export default new Storage()