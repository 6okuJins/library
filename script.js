const libraryContainer = document.querySelector(".library-container");
const addButton = document.querySelector(".library-container .add-book")
let myLibrary = [];

addButton.addEventListener("click", addToArray);

function Book(title, author, pages, complete) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.complete = complete;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.complete ? "completed" : "not yet read")}.`
}

function addToArray() {
    const title = prompt("Please enter the title:");
    const author = prompt("Please enter the author:");
    const pages = prompt("Please enter the number of pages:")
    const complete = confirm("Have you finished reading this book?");

    const newBook = new Book(title, author, pages, complete);
    myLibrary.push(newBook);
    updateGrid();

}
function addToGrid (book) {
    const newCard = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");

    newCard.classList.add('book-card');
    title.textContent = `${book.title}`;
    author.textContent = `by ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    if (book.complete) {
        readButton.classList.add('read');
        readButton.textContent = "Read";
    }
    else {
        readButton.classList.add('unread');
        readButton.textContent = "Unread";
    }
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    
    libraryContainer.appendChild(newCard);
    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(readButton);
    newCard.appendChild(removeButton);
}
function clearGrid () {
    while (libraryContainer.lastChild &&
    !(libraryContainer.lastChild.textContent.includes('\n')) && libraryContainer.lastChild.classList.contains("book-card")) {
        libraryContainer.removeChild(libraryContainer.lastChild);
    }
}
function updateGrid () {
    clearGrid();
    for (book of myLibrary) {
        addToGrid(book);
    }
}

//TESTING
const test = new Book("Test", "auth", 12, true);
myLibrary.push(test);
addToGrid(test);