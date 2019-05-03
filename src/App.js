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

  /**
   * Either move an existing book from one shelf to another or add a new book into a shelf
   * @param bookToUpdate
   * @param shelf
   * @returns {Promise<void>}
   */
  moveBook = async (bookToUpdate, shelf) => {

    // Take a deep copy of the book to update so we don't mutate the original
    let copyOfBookToUpdate = JSON.parse(JSON.stringify(bookToUpdate));
    copyOfBookToUpdate.shelf = shelf;

    const updatedBooks = this.state.books
      .filter(book => book.id !== copyOfBookToUpdate.id)
      .concat(copyOfBookToUpdate);

    // Update the UI first and then asynchronously push this change to the server
    this.setState({
      books: updatedBooks
    });

    await BooksAPI.update(copyOfBookToUpdate, shelf);
  };

  showSearchPage = (visible) => {
    this.setState({
      showSearchPage: visible
    })
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();

    console.log(books);

    this.setState({
      loading: false,
      books: books
    });
  }

  render() {
    return (
      <div className="app">

        <Header />

        <main>
          {this.state.showSearchPage && (
            <SearchPage
              showSearchPage={this.showSearchPage}
              moveBook={this.moveBook}
            />
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
        </main>

      </div>
    )
  }
}

export default BooksApp
