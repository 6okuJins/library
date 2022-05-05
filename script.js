let myLibrary = [];
const libraryContainer = document.querySelector(".library-container");
const addButton = document.querySelector(".library-container .add-book");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector('.modal');
const form = document.querySelector('form.modal');
const submit = document.querySelector('#submit');


addButton.addEventListener("click", () => overlay.classList.toggle('invisible'));
overlay.addEventListener("click", () => {
    form.reset();
    overlay.classList.toggle('invisible');
});
modal.addEventListener('click', (e) => e.stopPropagation());    
submit.addEventListener('click', (e) => {
    e.preventDefault();
    addToArray();
    form.reset();
    overlay.classList.toggle('invisible');
});

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
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector('#pages').value;
    const complete = document.querySelector('#complete').checked;

    const newBook = new Book(title, author, pages, complete);
    myLibrary.push(newBook);
    updateGrid();
    saveLocal();

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

    return newCard;
}
function clearGrid () {
    while (libraryContainer.lastChild &&
    !(libraryContainer.lastChild.textContent.includes('\n')) && libraryContainer.lastChild.classList.contains("book-card")) {
        libraryContainer.removeChild(libraryContainer.lastChild);
    }
}
function updateGrid () {
    clearGrid();
    let i = 0;
    for (book of myLibrary) {
        const bookCard = addToGrid(book);
        bookCard.dataset.index = i;
        i++;
    }
}

function saveLocal () {
    localStorage.setItem('library', JSON.stringify(myLibrary))
}
(function loadLocal () {
    const json = JSON.parse(localStorage.getItem('library'));
    if (json) {
        myLibrary = json.map((book) => new Book(book.title, book.author, book.pages, book.complete));
        updateGrid();
    }
})();