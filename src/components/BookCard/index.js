import { Component } from 'react'
import './index.css'

class BookCard extends Component {
  state = {show: true}
  
  onAddBook = () => {
    const { item } = this.props
    const updatedBook = {
      title: item.title,
      editionCount: item.edition_count,
    }


    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || []
    const existingBookIndex = bookshelf.findIndex(
      (book) => book.title === updatedBook.title && book.editionCount === updatedBook.editionCount
    );
  
    if (existingBookIndex === -1) {
      bookshelf.push(updatedBook);
      localStorage.setItem('bookshelf', JSON.stringify(bookshelf))
      this.setState({ show: false });
  
    } else {
      console.log('Book already exists in the bookshelf.');
    }


    this.setState({show: false})
  }

  render(){
    const {item} = this.props
    const updatedBook = {
        title: item.title,
        editionCount: item.edition_count,
        id: item.id
    }
    const {title, editionCount} = updatedBook
    const {show} = this.state
    return (
        <li className='book-card'>
          <div className='info'>
            <h1 className='key'>Book Title: </h1>
            <p className='value'>{title}</p>
          </div>
          <div className='info'>
            <h1 className='key'>Edition Count: </h1>
            <p className='value'>{editionCount}</p>
          </div>
          {show && <button onClick={this.onAddBook} className='addShelf-btn'>Add to Bookshelf</button>}
          {!show && <div className='empty'></div>}
        </li>
    )
  } 
}

export default BookCard