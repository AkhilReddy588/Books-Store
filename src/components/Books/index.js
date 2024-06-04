import {Component} from 'react'
import {Link} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import { IoSearch } from "react-icons/io5"
import { v4 as uuidv4 } from 'uuid'
import BookCard from '../BookCard'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN PROGRESS'
}

class Books extends Component {
    
    state = {booksList: [], apiStatus: apiStatusConstants.initial, searchValue: '', realSearch: ''}

    componentDidMount(){
        this.getBooks()
    }

    getBooks = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const {realSearch} = this.state
        const sValue = realSearch==='' ? 'YOUR_QUERY' : realSearch
        const url = `https://openlibrary.org/search.json?q=${sValue}&limit=10&page=1`
        const response = await fetch(url)
        if(response.ok === true){
            const data = await response.json()
            const books = data.docs
            const updatedBooks = books.map(eachItem => ({id: uuidv4(), ...eachItem}))
            if(updatedBooks.length === 0){
                this.setState({apiStatus: apiStatusConstants.failure})
            } else {
                this.setState({booksList: updatedBooks, apiStatus: apiStatusConstants.success})
            }
        } else {
            this.setState({apiStatus: apiStatusConstants.failure})
        }
        
        
    }

    onSearch = event => this.setState({searchValue: event.target.value})

    searchResult = event => {
        event.preventDefault()
        const {searchValue} = this.state
        this.setState({realSearch: searchValue}, this.getBooks)
    }

    renderLoadingView = () => (
        <div className="loader-container">
          <ThreeDots color="#0b69ff" height="50" width="50" />
        </div>
      )
    
    renderBooks = () => {
        const {booksList} = this.state
        
        return(
          <ul className='books-list'>
              {
                  booksList.map(eachItem => <BookCard item={eachItem} key={eachItem.id} />)
              }
          </ul>
        )  
    }

    renderFailureCase = () => (
        <div className='loader-container'>
            <h1>Not Found</h1>
        </div>
    )

    render(){
        const {apiStatus, searchValue} = this.state
        let value 
        switch(apiStatus){
            case(apiStatusConstants.success):
              value = this.renderBooks()
              break
            case(apiStatusConstants.inProgress):  
              value = this.renderLoadingView()
              break
            case(apiStatusConstants.failure):
              value = this.renderFailureCase()
              break  
            default:
                value = null  
        }
        return (
            <div className='books-container'>
                <div className='top-section'>
                    <div>
                      <h1 className='search-heading'>Search by book name:</h1>
                      <form className='search-bar' onSubmit={this.searchResult}>
                          <input value={searchValue} placeholder='Search Books' onChange={this.onSearch} type='search' className='search' />
                          <button type="submit">
                            <IoSearch className='search-icon' /> 
                          </button>  
                      </form>
                    </div>
                    <div>
                        <Link to='/book-shelf' className="nav-link">
                          <button className='shelf-btn'>My Bookshelf</button>
                        </Link>
                    </div>
                </div>
                {value}
            </div>
        )
    }
}

export default Books

