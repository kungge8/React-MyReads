import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Book.js';
import * as BooksAPI from '../BooksAPI.js';

class Search extends Component {
	state = {
		query: "",
		results: []
	}

	searchBooks = (e) =>{
		//search for book on input field change and trigger rerender to display result
		if(e.target.value){
			BooksAPI.search(e.target.value, 20).then(
				(res) => {
					if(!res.error){
						this.setState({
							results: res
						});
					} else {
						this.setState({
							results: []
						})
					}
				}
			);
		} else {
			this.setState({
				results: []
			})
		}
		
	}

	render (){
		return(
			<div className="search-books">
	      <div className="search-books-bar">
    	    <Link
            className="close-search"
            to="/"
          >
            <p>Close</p>
          </Link>
	        <div className="search-books-input-wrapper">
	          <input type="text" onChange={this.searchBooks} placeholder="Search by title or author"/>
	        </div>
	      </div>
	      <div className="search-books-results">
	        <ol className="books-grid">
	        	{this.state.results.map((n) => {
	        		let onShelf = this.props.currShelf.find((m) => m.id === n.id );
	        		if (onShelf){
	        			n.shelf = onShelf.shelf
	        		}
	        		return n;
	        	}).map(
          		(n) => {
          			return (
          				<Book
          					book={n}
          					key={n.id}
          					changeShelf={this.props.addBook}
          			/>);
          	})}
	        </ol>
	      </div>
	    </div>

		);
	}
}

export default Search;
