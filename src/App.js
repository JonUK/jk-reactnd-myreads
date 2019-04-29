import React from 'react'
import * as BooksAPI from './BooksAPI';
import Bookshelf from './Bookshelf';
import './App.css'
import logo from './logo/logo.svg';

class BooksApp extends React.Component {
  state = {
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

  moveBook = (bookId, shelf) => {
    const originalBook = this.state.books.find(book => book.id === bookId);

    // Take a deep copy of the book so we don't mutate the original
    let newBook = JSON.parse(JSON.stringify(originalBook));
    newBook.shelf = shelf;

    const updatedBooks = this.state.books.map(book => {
      return book === originalBook ? newBook : book;
    });

    this.setState({
      books: updatedBooks
    })
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({
          books: books
        });
      });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (

          <div className="list-books">
            <div className="list-books-title">
              <h1>
                <img src={logo} width="60" height="57" alt="" className="list-books-logo"/>
                MyReads
              </h1>
            </div>

            <div className="list-books-content">
              {this.state.bookshelves.map(bookshelf => {
                const bookshelfBooks = this.state.books.filter(book => book.shelf === bookshelf.value);
                return (
                  <Bookshelf
                    name={bookshelf.name}
                    books={bookshelfBooks}
                    key={bookshelf.value}
                    moveBook={this.moveBook} />
                );

                // TODO: Add a paragraph of text when the shelf has no books

              })}
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
