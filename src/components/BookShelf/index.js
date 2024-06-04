import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ShelfCard from '../ShelfCard'
import './index.css'

class Bookshelf extends Component{
    state = {bookShelf: []}
    componentDidMount(){
        this.getAddedBooks()
    }

    onRemoveCard = (item) => {
        const bookShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        const updatedShelf = bookShelf.filter((eachItem) => eachItem.title !== item.title && eachItem.editionCount !== item.editionCount);
        localStorage.setItem('bookshelf', JSON.stringify(updatedShelf));
        this.setState({bookShelf: updatedShelf}, this.getAddedBooks)
      }
    
    getAddedBooks = () => {
        const bookShelf = JSON.parse(localStorage.getItem('bookshelf')) || []
        const updatedShelf = bookShelf.map(eachItem => ({
            title: eachItem.title,
            editionCount: eachItem.edition_count,
            id: uuidv4()
        }))
        this.setState({bookShelf: updatedShelf})
    }

    renderBooks = () => {
        const {bookShelf} = this.state
        
        return(
          <ul className='books-list'>
              {
                bookShelf.map(eachItem => <ShelfCard item={eachItem} key={eachItem.id} onRemoveCard={this.onRemoveCard} />)
              }
          </ul>
        )  
    }

    render(){
        return (
            <div className='book-shelf'>
                <h1 className='heading'>My BookShelf</h1>
                {this.renderBooks()}
            </div>
        )
    }
}

export default Bookshelf