import { Component } from 'react'
import './index.css'

class ShelfCard extends Component {
  
    onRemove = () => {
        const {onRemoveCard, item} = this.props
        onRemoveCard(item)
      }

  render(){
    const {item} = this.props
    const {title, editionCount} = item
    
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
          <button onClick={this.onRemove} className='addShelf-btn'>Remove from Bookshelf</button>
        </li>
    )
  } 
}

export default ShelfCard