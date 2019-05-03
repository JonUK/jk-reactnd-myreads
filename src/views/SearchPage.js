import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from "../components/Book";

class SearchPage extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    query: '',
    results: []
  };

  handleSearch = async (event) => {

    this.setState({ query: event.target.value });

    const results = await this.props.search(event.target.value);

    this.setState({ results: results });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              aria-label="Search by title or author"
              value={this.state.query}
              onChange={this.handleSearch} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map(book =>(
              <li key={book.id}>
                <Book book={book} moveBook={this.props.moveBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage;
