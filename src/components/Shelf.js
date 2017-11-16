import React from 'react';
import Book from "./Book.js";

var Shelf = (props) => {
	// console.log("shelfrender");
	return (
		<div>
			<div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          	{props.books.map(
          		(n) => {
          			return (
          				<Book
          					book={n}
          					key={n.id}
          					cShelf={props.cShelf}
          			/>);
          		})}
          </ol>
        </div>
      </div>
		</div>
	);
}

export default Shelf;