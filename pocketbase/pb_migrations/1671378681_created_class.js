migrate((db) => {
  const collection = new Collection({
    "id": "wmswn0h8k0hq3kh",
    "created": "2022-12-18 15:51:21.551Z",
    "updated": "2022-12-18 15:51:21.551Z",
    "name": "class",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "crw6pvn7",
        "name": "code",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ts2cwwod",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("wmswn0h8k0hq3kh");

  return dao.deleteCollection(collection);
})
