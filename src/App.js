import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './components/Shelf';
import Search from './components/Search';
import NoMatch from './components/NoMatch';
import {Route, Link, Switch} from 'react-router-dom';

  class BooksApp extends React.Component {
    state = {
      shelf: [],
      // currentlyReading:[],
      // wantToRead: [],
      // read: []
    }

  updateShelf = (shelf) => {
    //updates shelf in state
    this.setState({
        shelf: shelf,
        // currentlyReading: shelf.filter((book) => book.shelf === "currentlyReading"),
        // wantToRead: shelf.filter((book) => book.shelf === "wantToRead"),
        // read: shelf.filter((book) => book.shelf === "read")
    });
  }

  getShelf = () => {
    //query db for user's shelf
    BooksAPI.getAll().then((res) => {
      this.updateShelf(res);
      // console.log("getShelf returned: ", this.state.shelf);
    });
  }

  changeShelf = () => {
    //event handler to change the shelf of a book. Partial application to save the app to reference state, then again in the book element this gets passed down to to save the books props.
    const parent = this;
    return (props) => {
      return (e) => {
        const et = e.target.value;
        BooksAPI.update(props, et).then((res) => {
          parent.getShelf();
        });

        // const et = e.target.value;
        // BooksAPI.update(props, et).then((res) => {
        //   parent.setState(previousState => ({
        //     shelf: previousState.shelf.filter(b=> b.id !== props.id).concat([props])
        //   }))
        // });
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
        <Switch>
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
                    books={this.state.shelf.filter((book) => book.shelf === "currentlyReading")}
                    title="Currently Reading"
                    cShelf={this.changeShelf()}
                  />
                  <Shelf 
                    className="bookshelf"
                    books={this.state.shelf.filter((book) => book.shelf === "wantToRead")}
                    title="Want To Read"
                    cShelf={this.changeShelf()}
                  />
                  <Shelf 
                    className="bookshelf" 
                    books={this.state.shelf.filter((book) => book.shelf === "read")}
                    title="Read"
                    cShelf={this.changeShelf()}
                  />
                </div>
                <div className="open-search">
                  <Link
                    className="open-search"
                    to="/search"
                  />
                </div>
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

          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
