import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.error('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readWrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, value: value });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Added logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.error('Get from the database');
  const jateDb = await openDB('jate', 1);
  const tx =  jateDb.transaction('jate', 'readWrite');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request
  if (result) {
    console.log('Data acquired');
    return result.value;
  } else {
    console.error('Data not found in database')
  }
};

initdb();
