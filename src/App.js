import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Books from './components/Books'
import Bookshelf from './components/BookShelf'
import './App.css'

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/Books-Store' component={Books} />
        <Route exact path='/book-shelf' component={Bookshelf} />
      </Switch>
    </BrowserRouter>
  </>
)

export default App