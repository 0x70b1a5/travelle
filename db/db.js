const DB = {
  init(db) {
    this._db = db
  },

  collection(name) {
    return this._db.collection(name)
  },

  find(filter) {
    return this.collection('rides')
      .find(filter)
      .toArray()
  },

  insert(item) {
    return this.collection('rides')
      .insertOne(item)
  },

  update(id, item) {
    return this.collection('rides')
      .findOneAndUpdate(
        { _id: id },
        { $set: update },
        { returnOriginal: false }
      )
  },
}

module.exports = DB
