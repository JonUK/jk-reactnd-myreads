import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from "../components/Book";

class SearchPage extends Component {
  static propTypes = {
    showSearchPage: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    moveBook: PropTypes.func.isRequired
  };

  state = {
    results: []
  };

  handleSearch = async (event) => {
    const results = await this.props.search(event.target.value);

    this.setState({
      results: results
    })
  };

  // TODO: Look at how to set the input as having focus

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.props.showSearchPage(false)}>Close</button>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              aria-label="Search by title or author"
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
