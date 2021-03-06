import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookMenu extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  handleChangeShelf = (event) => {
    this.props.moveBook(this.props.book, event.target.value);
    event.preventDefault();
  };

  render() {
    const { book } = this.props;
    const shelf = book.shelf || 'none';

    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChangeShelf}>
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
