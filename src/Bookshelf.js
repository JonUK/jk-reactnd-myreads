import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function Bookshelf(props) {

  return (
    <div>
      <h1>Bookshelf - {props.name}</h1>
      {props.books.map(book => (
        <Book book={book} key={book.id} />
      ))}
    </div>

  );
}

Bookshelf.propTypes = {
  books: PropTypes.array
};

export default Bookshelf;
