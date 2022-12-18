migrate((db) => {
  const collection = new Collection({
    "id": "95fknb3vmx3yall",
    "created": "2022-12-18 15:54:43.160Z",
    "updated": "2022-12-18 15:54:43.160Z",
    "name": "attendance",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "dakfmxvu",
        "name": "date",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("95fknb3vmx3yall");

  return dao.deleteCollection(collection);
})
