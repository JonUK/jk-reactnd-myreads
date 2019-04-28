import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {

  return (
    <h3>{props.book.title}</h3>
  );
}

Book.propTypes = {
  book: PropTypes.object
};

export default Book;
