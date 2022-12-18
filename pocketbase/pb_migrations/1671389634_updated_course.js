migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wmswn0h8k0hq3kh")

  // remove
  collection.schema.removeField("9bspfhcw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wmswn0h8k0hq3kh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9bspfhcw",
    "name": "manager",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
