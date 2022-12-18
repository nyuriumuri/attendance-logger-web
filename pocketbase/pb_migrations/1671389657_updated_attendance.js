migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95fknb3vmx3yall")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9cdltpu5",
    "name": "course",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "wmswn0h8k0hq3kh",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95fknb3vmx3yall")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9cdltpu5",
    "name": "field",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "wmswn0h8k0hq3kh",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
