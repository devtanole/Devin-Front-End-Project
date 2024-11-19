const dataKey = 'game-of-thrones-data';
export function readData() {
  const localData = localStorage.getItem(dataKey);
  if (localData) {
    return JSON.parse(localData);
  } else {
    // if no data, throw an error
    throw new Error('No data found');
  }
}
//write data to localStorage
export function writeData(data) {
  localStorage.setItem(dataKey, JSON.stringify(data)); // Store data in localStorage
}
export let data;
try {
  data = readData(); // read the data from localStorage
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('An unknown error occurred');
  }
  // initialize `data` with an empty structure
  data = {
    view: 'home-page',
    characters: [],
    houses: [],
    books: [],
    editing: null,
    nextCharacterId: 1,
    nextHouseId: 1,
    nextBookId: 1,
  };
}
