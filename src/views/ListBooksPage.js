import React from 'react';
import PropTypes from 'prop-types';
import Bookshelf from "../components/Bookshelf";

// TODO: Review if this component should hold state on the books and shelves or not

function ListBooksPage(props) {

  const bookshelves = [
    {value: 'currentlyReading', name: 'Currently Reading'},
    {value: 'wantToRead', name: 'Want To Read'},
    {value: 'read', name: 'Read'},
  ];

  return (
    <div>

      {props.loading && (
        <div className="loader" aria-label="Loading"/>
      )}

      {!props.loading && (
        <div>
          <div className="list-books-content">
            {bookshelves.map(bookshelf => {
              const bookshelfBooks = props.books.filter(book => book.shelf === bookshelf.value);
              return (
                <Bookshelf
                  name={bookshelf.name}
                  books={bookshelfBooks}
                  key={bookshelf.value}
                  moveBook={props.moveBook}
                />
              );
            })}
          </div>
          <div className="open-search">
            <button onClick={() => props.showSearchPage(true)}>Search for book to add</button>
          </div>
        </div>
      )}

    </div>
  )
}

ListBooksPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
  showSearchPage: PropTypes.func.isRequired
};

export default ListBooksPage;
