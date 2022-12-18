migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95fknb3vmx3yall")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qxj1hi0p",
    "name": "attended_students",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "ltpx76fnl5ru1o7",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("95fknb3vmx3yall")

  // remove
  collection.schema.removeField("qxj1hi0p")

  return dao.saveCollection(collection)
})
