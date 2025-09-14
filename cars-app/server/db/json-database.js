const fs = require("fs").promises;
const path = require("path");

class JSONDatabase {
  constructor(filePath) {
    this.filePath = filePath;
    this.queue = Promise.resolve();
  }

  async _readRaw() {
    try {
      const text = await fs.readFile(this.filePath, "utf8");
      if (!text) return [];

      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) return parsed;
      if (parsed?.items && Array.isArray(parsed.items)) return parsed.items;

      return [];
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async _writeAtomic(arr) {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });

    const tmp = this.filePath + ".tmp";
    const data = JSON.stringify(arr, null, 2);

    await fs.writeFile(tmp, data, "utf8");
    await fs.rename(tmp, this.filePath);
  }

  async readAll() {
    return this._readRaw();
  }

  async writeAll(arr) {
    if (!Array.isArray(arr)) {
      throw new Error("writeAll expects an array");
    }

    this.queue = this.queue.then(() => this._writeAtomic(arr));
    return this.queue;
  }
}

module.exports = JSONDatabase;
