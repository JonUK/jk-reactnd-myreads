import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function Bookshelf(props) {

  // TODO: Review adding a paragraph of text when the shelf has no books

  return (
    <section className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => (
            <li key={book.id}>
              <Book book={book} moveBook={props.moveBook} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Bookshelf;
