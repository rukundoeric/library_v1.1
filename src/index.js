/* eslint-disable no-undef */

function bookItem(book) {
  const itemContainer = document.createElement('div');
  itemContainer.setAttribute('class', 'col-lg-3 m-2');

  const item = document.createElement('div');
  item.classList.add('item');

  const pages = document.createElement('span');
  pages.setAttribute('class', 'pages-nbr px-3 pt-1 pb-2');
  const pageText = document.createTextNode(`${book.pages_num} pages`);
  pages.appendChild(pageText);

  const icondiv = document.createElement('div');
  icondiv.setAttribute('class', 'd-flex justify-content-center align-items-center my-5 book-icon');
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
  readbtn.appendChild(document.createTextNode('Read'));

  const editbtn = document.createElement('button');
  editbtn.setAttribute('class', 'edit');
  editbtn.appendChild(document.createTextNode('Edit'));

  const deletebtn = document.createElement('button');
  deletebtn.setAttribute('class', 'delete');
  deletebtn.appendChild(document.createTextNode('Delete'));


  actions.appendChild(readbtn);
  actions.appendChild(editbtn);
  actions.appendChild(deletebtn);


  item.appendChild(pages);
  item.appendChild(icondiv);
  item.appendChild(info);
  item.appendChild(actions);

  itemContainer.appendChild(item);

  return itemContainer;
}

const bookList = document.querySelector('#bookList');

bookList.appendChild(bookItem({ title: 'The Stranger', pages_num: 25, author: 'Eric' }));

// const ref = firebase.database().ref();
// const booksref = ref.child('books');

// booksref.once('value', (snap) => {
//   snap.forEach((childSnapshot) => {
//     console.log(childSnapshot.child('pages').val());
//   });
//   // console.log('initial data loaded!', snap.numChildren());
// });

// const newref = ref.child('books').child('the_flash_1');
// newref.remove();

// ref
//   .orderByKey()
//   .on('child_added', (snapshot) => {
//     console.log(snapshot.key);
//   });