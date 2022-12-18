migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltpx76fnl5ru1o7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ggrv6zof",
    "name": "courses",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "wmswn0h8k0hq3kh",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ltpx76fnl5ru1o7")

  // remove
  collection.schema.removeField("ggrv6zof")

  return dao.saveCollection(collection)
})
