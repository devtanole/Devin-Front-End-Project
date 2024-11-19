// Define the key for localStorage and the Data object structure
const dataKey = 'game-of-thrones-data';
let data = {
  characters: [],
  houses: [],
  books: [],
  editing: null,
  nextCharacterId: 1,
  nextHouseId: 1,
  nextBookId: 1,
};
// Function to read the data from localStorage (optional, to persist across sessions)
function readData() {
  const localData = localStorage.getItem(dataKey);
  if (localData) {
    return JSON.parse(localData);
  }
  return data; // Return the default structure if no data is found
}
// Function to write the data to localStorage
function writeData() {
  localStorage.setItem(dataKey, JSON.stringify(data));
}
// Fetch characters, houses, and books from the API
async function fetchData() {
  try {
    // Fetch character data from the API (replace with actual URL)
    const characterResponse = await fetch('https://api.example.com/characters');
    const characters = await characterResponse.json();
    // Fetch house data from the API (replace with actual URL)
    const houseResponse = await fetch('https://api.example.com/houses');
    const houses = await houseResponse.json();
    // Fetch book data from the API (replace with actual URL)
    const bookResponse = await fetch('https://api.example.com/books');
    const books = await bookResponse.json();
    // Populate the data with the fetched data
    data.characters = characters;
    data.houses = houses;
    data.books = books;
    // Update the next IDs
    data.nextCharacterId = characters.length + 1;
    data.nextHouseId = houses.length + 1;
    data.nextBookId = books.length + 1;
    // Save the data to localStorage
    writeData();
    // Call to render all lists
    renderCharacterList('');
    renderHouseList('');
    renderBookList('');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
// Call to fetch data
fetchData();
// Render character list
function renderCharacterList(searchInput) {
  const characterList = document.getElementById('character-list');
  characterList.innerHTML = '';
  const filteredCharacters = data.characters.filter((character) => {
    const fullName = character.name.toLowerCase();
    const lastName = fullName.split(' ').pop() || '';
    return fullName.includes(searchInput) || lastName.includes(searchInput);
  });
  filteredCharacters.forEach((character) => {
    const li = document.createElement('li');
    li.textContent = character.name;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      populateFormWithCharacter(character.characterId);
    });
    li.appendChild(editButton);
    characterList.appendChild(li);
  });
}
// Render house list
function renderHouseList(searchInput) {
  const houseList = document.getElementById('house-list');
  houseList.innerHTML = '';
  const filteredHouses = data.houses.filter((house) =>
    house.name.toLowerCase().includes(searchInput),
  );
  filteredHouses.forEach((house) => {
    const li = document.createElement('li');
    li.textContent = house.name;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      populateFormWithHouse(house.houseId);
    });
    li.appendChild(editButton);
    houseList.appendChild(li);
  });
}
// Render book list
function renderBookList(searchInput) {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  const filteredBooks = data.books.filter((book) =>
    book.title.toLowerCase().includes(searchInput),
  );
  filteredBooks.forEach((book) => {
    const li = document.createElement('li');
    li.textContent = book.title;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      populateFormWithBook(book.bookId);
    });
    li.appendChild(editButton);
    bookList.appendChild(li);
  });
}
// Populate character form
function populateFormWithCharacter(characterId) {
  const character = data.characters.find((c) => c.characterId === characterId);
  if (character) {
    const form = document.getElementById('character-form');
    const nameInput = form.querySelector('input[name="name"]');
    const houseInput = form.querySelector('input[name="house"]');
    const imageInput = form.querySelector('input[name="image"]');
    const bioInput = form.querySelector('textarea[name="bio"]');
    nameInput.value = character.name;
    houseInput.value = character.house;
    imageInput.value = character.image;
    bioInput.value = character.bio;
  }
}
// Populate house form
function populateFormWithHouse(houseId) {
  const house = data.houses.find((h) => h.houseId === houseId);
  if (house) {
    const form = document.getElementById('house-form');
    const nameInput = form.querySelector('input[name="name"]');
    const sigilInput = form.querySelector('input[name="sigil"]');
    const regionInput = form.querySelector('input[name="region"]');
    const lordInput = form.querySelector('input[name="lord"]');
    nameInput.value = house.name;
    sigilInput.value = house.sigil;
    regionInput.value = house.region;
    lordInput.value = house.lord;
  }
}
// Populate book form
function populateFormWithBook(bookId) {
  const book = data.books.find((b) => b.bookId === bookId);
  if (book) {
    const form = document.getElementById('book-form');
    const titleInput = form.querySelector('input[name="title"]');
    const authorInput = form.querySelector('input[name="author"]');
    const yearInput = form.querySelector('input[name="publishedYear"]');
    const genreInput = form.querySelector('input[name="genre"]');
    const summaryInput = form.querySelector('textarea[name="summary"]');
    const pagesInput = form.querySelector('input[name="pages"]');
    titleInput.value = book.title;
    authorInput.value = book.author;
    yearInput.value = book.publishedYear.toString();
    genreInput.value = book.genre;
    summaryInput.value = book.summary;
    pagesInput.value = book.pages.toString();
  }
}
const searchInput = document.getElementById('character-search');
searchInput.addEventListener('input', () => {
  renderCharacterList(searchInput.value); // Re-render list based on search query
});
document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links and the corresponding sections
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('[data-view]');
  // Function to switch views
  const switchView = (viewName) => {
    // Hide all views by adding the 'hidden' class
    viewSections.forEach((view) => {
      view.classList.add('hidden');
    });
    // Show the clicked view by removing the 'hidden' class
    const activeView = document.querySelector(`[data-view="${viewName}"]`);
    if (activeView) {
      activeView.classList.remove('hidden');
    }
  };
  // Add click event listeners to each navigation item
  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      // Get the target view from the clicked link's data-view attribute
      const viewName = item.getAttribute('data-view');
      if (viewName) {
        // Call switchView with the clicked view name
        switchView(viewName);
      }
    });
  });
  // Optional: Show the default view (e.g., home-page or characters) when the page loads
  switchView('home-page');
});
export {};
