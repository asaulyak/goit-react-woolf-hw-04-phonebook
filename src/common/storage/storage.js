class StorageService {
  #PREFIX_KEY = 'phonebook';

  set(key, value) {
    localStorage.setItem(this.#composeKey(key), JSON.stringify(value));
  }

  get(key) {
    try {
      return JSON.parse(localStorage.getItem(this.#composeKey(key)));
    } catch (e) {
      return null;
    }
  }

  remove(key) {
    localStorage.removeItem(this.#composeKey(key));
  }

  clear() {
    localStorage.clear();
  }

  #composeKey(key) {
    return `${this.#PREFIX_KEY}.${key}`;
  }
}

export const storage = new StorageService();
