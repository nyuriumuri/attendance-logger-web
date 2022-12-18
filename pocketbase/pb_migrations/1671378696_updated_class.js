migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wmswn0h8k0hq3kh")

  collection.name = "course"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wmswn0h8k0hq3kh")

  collection.name = "class"

  return dao.saveCollection(collection)
})
