/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const bookList = document.querySelector('#bookList');
const dbref = firebase.database().ref();
const booksref = dbref.child('books');

function Book(id, author, title, pages, status) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readStatus = status;
}

function deleteBook(e) {
  booksref.child(e.target.dataset.id).remove();
  refresh();
}

function changeReadStatus(e) {
  const value = e.target.dataset.value === 'read';
  booksref.child(e.target.dataset.id).child('readStatus').set(value);
  refresh();
}

function bookItem(book) {
  const itemContainer = document.createElement('div');
  itemContainer.setAttribute('class', 'col-lg-3 m-2');

  const item = document.createElement('div');
  item.classList.add('item');

  const pages = document.createElement('span');
  pages.setAttribute('class', 'pages-nbr px-3 pt-1 pb-2');
  const pageText = document.createTextNode(`${book.pages} pages`);
  pages.appendChild(pageText);

  const icondiv = document.createElement('div');
  icondiv.setAttribute(
    'class',
    'd-flex justify-content-center align-items-center my-5 book-icon',
  );
  const icon = document.createElement('i');
  icon.setAttribute('class', 'ti-book');
  icondiv.appendChild(icon);

  const info = document.createElement('div');
  info.setAttribute('class', 'px-3');

  const title = document.createElement('h5');
  title.setAttribute('class', 'title');
  title.appendChild(document.createTextNode(`${book.title}`));

  const author = document.createElement('span');
  author.setAttribute('class', 'author');
  author.appendChild(document.createTextNode(`» ${book.author}`));
  info.appendChild(title);
  info.appendChild(author);

  const actions = document.createElement('div');
  actions.setAttribute(
    'class',
    'actions d-flex mb-auto justify-content-between',
  );

  const readbtn = document.createElement('button');
  readbtn.setAttribute('class', 'read');
  readbtn.setAttribute('data-id', book.id);
  const readbtnValue = book.readStatus === true ? 'not read' : 'read';
  readbtn.setAttribute('data-value', readbtnValue);
  readbtn.appendChild(document.createTextNode(readbtnValue));
  readbtn.addEventListener('click', changeReadStatus);

  const deletebtn = document.createElement('button');
  deletebtn.setAttribute('class', 'delete');
  deletebtn.setAttribute('data-id', book.id);
  deletebtn.addEventListener('click', deleteBook);
  deletebtn.appendChild(document.createTextNode('Delete'));

  actions.appendChild(readbtn);
  actions.appendChild(deletebtn);

  item.appendChild(pages);
  item.appendChild(icondiv);
  item.appendChild(info);
  item.appendChild(actions);

  itemContainer.appendChild(item);

  return itemContainer;
}

function listBooks() {
  booksref.once('value', (snap) => {
    bookList.innerHTML = '';
    snap.forEach((childSnapshot) => {
      const book = new Book(
        childSnapshot.key,
        childSnapshot.child('author').val(),
        childSnapshot.child('title').val(),
        childSnapshot.child('pages').val(),
        childSnapshot.child('readStatus').val(),
      );
      bookList.appendChild(bookItem(book));
    });
  });
}

function refresh() {
  listBooks();
}

function addBookToLibrary(book) {
  booksref.push(book);
  refresh();
}

const myForm = document.querySelector('#my_form');
myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const book = new Book(
    '',
    data.get('author'),
    data.get('title'),
    data.get('pages'),
    false,
  );
  addBookToLibrary(book);
});

listBooks();