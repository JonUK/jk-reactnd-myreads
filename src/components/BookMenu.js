import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookMenu extends Component {
  static propType = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  handleChangeShelf = (event) => {
    this.props.moveBook(this.props.book.id, event.target.value);
    event.preventDefault();
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={this.handleChangeShelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookMenu;
