import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from "../components/Bookshelf";

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
            <NavLink to="/search">Search for book to add</NavLink>
          </div>
        </div>
      )}

    </div>
  )
}

ListBooksPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default ListBooksPage;
