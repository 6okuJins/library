const libraryContainer = document.querySelector(".library-container");
const addButton = document.querySelector(".library-container .add-book")
let myLibrary = [];

addButton.addEventListener("click", addToLibrary);

function Book(title, author, pages, complete) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.complete = complete;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.complete ? "completed" : "not yet read")}.`
}

function addToLibrary() {
    const title = prompt("Please enter the title:");
    const author = prompt("Please enter the author:");
    const pages = prompt("Please enter the number of pages:")
    const complete = confirm("Have you finished reading this book?");

    const newBook = new Book(title, author, pages, complete);
    myLibrary.push(newBook);

}