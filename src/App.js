import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './components/Shelf';
import Search from './components/Search';
import {Route, Link} from 'react-router-dom';

  class BooksApp extends React.Component {
    state = {
      shelf: [],
      currentlyReading:[],
      wantToRead: [],
      read: []
    }

  updateShelf = (shelf) => {
    this.setState({
        shelf: shelf,
        currentlyReading: shelf.filter((book) => book.shelf === "currentlyReading"),
        wantToRead: shelf.filter((book) => book.shelf === "wantToRead"),
        read: shelf.filter((book) => book.shelf === "read")
    });
  }

  getShelf = () => {
    BooksAPI.getAll().then((res) => {
      this.updateShelf(res);
      // console.log("getShelf returned: ", this.state.shelf);
    });
  }

  changeShelf = () => {
    const parent = this;
    return (props) => {
      return (e) => {
        BooksAPI.update(props, e.target.value).then((res) => {
          parent.getShelf();
        });
      };
    };
  }

  componentDidMount(){
    this.getShelf();
  }

  render() {
    // console.log("apprender");
    return (
      <div className="app">
       <Route exact path="/" render={
        () => {
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div>
                <Shelf 
                  className="bookshelf" 
                  books={this.state.currentlyReading}
                  title="Currently Reading"
                  cShelf={this.changeShelf()}
                />
                <Shelf 
                  className="bookshelf"
                  books={this.state.wantToRead}
                  title="Want To Read"
                  cShelf={this.changeShelf()}
                />
                <Shelf 
                  className="bookshelf" 
                  books={this.state.read}
                  title="Read"
                  cShelf={this.changeShelf()}
                />
              </div>
              <Link
                className="open-search"
                to="/search"
              >
                <a>Add a Book</a>
              </Link>
            </div>
          );
        }
       } />

       <Route path="/search" render={
        () => {
          // console.log("search rendered");
          return (
            <Search
              currShelf={this.state.shelf.map((n) => n.id)}
              addBook={this.changeShelf()}
            />
          );
        }
       } />
      </div>
    )
  }
}

export default BooksApp
