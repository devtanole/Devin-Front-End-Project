export interface Character {
  characterId: number;
  name: string;
  house: string;
  image: string;
  bio: string;
}

export interface House {
  houseId: number;
  name: string;
  sigil: string;
  region: string;
  lord: string;
  members: string[];
}

export interface Book {
  bookId: number;
  title: string;
  author: string;
  publishedYear: number;
  genre: string;
  summary: string;
  pages: number;
}

export interface Data {
  view: 'home-page' | 'characters' | 'books' | 'houses' | 'profile-creator';
  characters: Character[];
  houses: House[];
  books: Book[];
  editing: null | Character | House | Book;
  nextCharacterId: number;
  nextHouseId: number;
  nextBookId: number;
}

const dataKey = 'game-of-thrones-data';

export function readData(): Data {
  const localData = localStorage.getItem(dataKey);
  if (localData) {
    return JSON.parse(localData) as Data;
  } else {
    // if no data, throw an error
    throw new Error('No data found');
  }
}

// write data to localStorage
export function writeData(data: Data): void {
  localStorage.setItem(dataKey, JSON.stringify(data)); // Store data in localStorage
}

export let data: Data;

try {
  data = readData(); // read the data from localStorage
} catch (error: unknown) {
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
