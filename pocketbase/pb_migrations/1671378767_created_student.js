migrate((db) => {
  const collection = new Collection({
    "id": "ltpx76fnl5ru1o7",
    "created": "2022-12-18 15:52:47.777Z",
    "updated": "2022-12-18 15:52:47.777Z",
    "name": "student",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "soiknghp",
        "name": "student_id",
        "type": "number",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "ciuw8qwu",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "uuvacnwx",
        "name": "rfid",
        "type": "text",
        "required": true,
        "unique": true,
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
  const collection = dao.findCollectionByNameOrId("ltpx76fnl5ru1o7");

  return dao.deleteCollection(collection);
})
