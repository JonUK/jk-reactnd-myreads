import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Header from './components/Header';
import SearchPage from './views/SearchPage';
import ListBooksPage from './views/ListBooksPage';
import './App.css';

class BooksApp extends React.Component {
  state = {
    loading: true,
    books: []
  };

  /**
   * Either move an existing book from one shelf to another or add a new book into a shelf
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

  search = async (query) => {
    let results = [];

    if (query) {
      const serverData = await BooksAPI.search(query);
      const resultsReturned = serverData.error !== 'empty query'; // This message is returned when there are no results

      if (resultsReturned) {
        // For each server response book, see if the book is in state and if so then use
        results = serverData.map(serverBook => {
          const stateBook = this.state.books.find(x => x.id === serverBook.id);
          return stateBook || serverBook;
        });
      }
    }

    return results;
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

        <main>

          <Route exact path="/" render={() => (
            <ListBooksPage
              loading={this.state.loading}
              books={this.state.books}
              moveBook={this.moveBook}
            />
          )}/>

          <Route path="/search" render={() => (
            <SearchPage
              search={this.search}
              moveBook={this.moveBook}
            />
          )}/>

        </main>

      </div>
    )
  }
}

export default BooksApp
