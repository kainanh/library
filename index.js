const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages
    this.read = read
}

let library = document.getElementById("library")
let i = 0;

function createLibrary(book){
    
    
    let bookCard = document.createElement("div")
    bookCard.classList.add("book-card")

    let title = document.createElement("h1")
    let author = document.createElement("h2")
    let pages = document.createElement("h3")
    let readButton = document.createElement("button")
    let deleteButton = document.createElement("button")
    
    title.textContent = book.title
    bookCard.appendChild(title);

    author.textContent = book.author
    bookCard.appendChild(author);

    pages.textContent = `No. of pages: ${book.pages}`
    bookCard.appendChild(pages);

    if(book.read === 'yes'){
        readButton.textContent = 'READ'
        readButton.classList.add("finished-book")
    }else if (book.read === 'no'){
        readButton.textContent = "HAVE YOU FINISHED YET?"
        readButton.classList.add("unfinished-book")
    }
    readButton.addEventListener("click", updateReadStatus)
    bookCard.appendChild(readButton)

    deleteButton.textContent = 'DELETE'
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click", removeBook)
    bookCard.appendChild(deleteButton)

    library.appendChild(bookCard)
    bookCard.setAttribute("index", i)
    i++;
}

const book1 = new Book('The Shining', 'Stephen King', '497', 'yes')
const book2 = new Book('The Bone Collector', 'Jeffery Deaver', '461', 'no')
const book3 = new Book("Harry Potter and the Philosopher's Stone", 'J.K. Rowling', '223', 'yes')

myLibrary.push(book1, book2, book3)
myLibrary.forEach(book => createLibrary(book))

function addBookToLibrary() {
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let checked = document.querySelector('input[name="read"]:checked').value

    let newBook = new Book(title, author, pages, checked)
    myLibrary.push(newBook)

    createLibrary(myLibrary[myLibrary.length - 1]);

    closeForm();
}

function openForm(){
    document.getElementById("form").style.display = 'flex'
}

function closeForm(){
    document.getElementById("new-book-form").reset()
    document.getElementById("form").style.display = 'none'
}

function updateReadStatus(){

    let bookIndex = this.parentNode.getAttribute("index")

    if(this.classList.value == 'finished-book'){
        myLibrary[bookIndex].read = 'no'
        this.classList.value = 'unfinished-book'
        this.textContent = 'HAVE YOU FINISHED YET?'
    } else{
        myLibrary[bookIndex].read = 'yes'
        this.classList.value = 'finished-book'
        this.textContent = 'READ'
    }
}

function removeBook(){
    let bookIndex = this.parentNode.getAttribute("index")
    if(confirm("Are you sure you want to delete this book?")){
        delete myLibrary[bookIndex];
        this.parentNode.remove();
    } 
}