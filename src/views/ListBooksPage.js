import React from 'react';
import PropTypes from 'prop-types';
import Bookshelf from "../components/Bookshelf";

// TODO: Review if this component should hold state on the books and shelves or not

function ListBooksPage(props) {

  return (
    <div>
      <div className="list-books-content">
        {props.bookshelves.map(bookshelf => {
          const bookshelfBooks = props.books.filter(book => book.shelf === bookshelf.value);
          return (
            <Bookshelf
              name={bookshelf.name}
              books={bookshelfBooks}
              key={bookshelf.value}
              moveBook={props.moveBook} />
          );
        })}
      </div>
      <div className="open-search">
        <button onClick={() => props.showSearchPage(true)}>Add a book</button>
      </div>
    </div>
  )
}

ListBooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  bookshelves: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
  showSearchPage: PropTypes.func.isRequired
};

export default ListBooksPage;
