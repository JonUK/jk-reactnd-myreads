import React from 'react'
import * as BooksAPI from './BooksAPI';
import Header from './components/Header';
import SearchPage from './views/SearchPage';
import ListBooksPage from './views/ListBooksPage';
import './App.css'

class BooksApp extends React.Component {
  state = {
    loading: true,
    books: [],
    bookshelves: [
      { value: 'currentlyReading', name: 'Currently Reading' },
      { value: 'wantToRead', name: 'Want To Read' },
      { value: 'read', name: 'Read' },
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  moveBook = async (bookId, shelf) => {
    const originalBook = this.state.books.find(book => book.id === bookId);

    // Take a deep copy of the book so we don't mutate the original
    let newBook = JSON.parse(JSON.stringify(originalBook));
    newBook.shelf = shelf;

    const updatedBooks = this.state.books.map(book => {
      return book === originalBook ? newBook : book;
    });

    this.setState({
      books: updatedBooks
    });

    await BooksAPI.update(newBook, shelf);
  };

  showSearchPage = (visible) => {
    this.setState({
      showSearchPage: visible
    })
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();

    this.setState({
      loading: false,
      books: books
    });
  }

  render() {
    return (
      <div className="app">
        <Header />

        {this.state.showSearchPage && (
          <SearchPage showSearchPage={this.showSearchPage} />
        )}

        {!this.state.showSearchPage && this.state.loading && (
          <div className="loader" aria-label="Loading" />
        )}

        {!this.state.showSearchPage && !this.state.loading && (
          <ListBooksPage
            books={this.state.books}
            bookshelves={this.state.bookshelves}
            moveBook={this.moveBook}
            showSearchPage={this.showSearchPage}
          />
        )}

      </div>
    )
  }
}

export default BooksApp
