import React from 'react';
import PropTypes from 'prop-types';
import BookMenu from './BookMenu';

function Book(props) {
  const imageUrl = `http://books.google.com/books/content?id=${props.book.id}&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api`;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }}
          aria-hidden="true">
        </div>
        <BookMenu book={props.book} moveBook={props.moveBook} />
      </div>
      <h3 className="book-title">{props.book.title}</h3>
      <div className="book-authors">
        {
          (props.book.authors || []).join(', ')
        }
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired
};

export default Book;
