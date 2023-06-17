import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import LoginDetailsContext from './context/loginDetailsContext'
import NotFound from './components/NotFound'
import Search from './components/Search'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    loginDetails: {},
    searchMoviesList: [],

    searchText: '',
  }

  uploadLoginDetails = loginDetails => {
    this.setState({loginDetails})
  }

  passSearchText = searchText => {
    this.setState({searchText})
  }

  passSearchMoviesList = searchMoviesList => {
    this.setState({searchMoviesList})
  }

  render() {
    const {
      loginDetails,

      searchText,
      searchMoviesList,
    } = this.state
    return (
      <LoginDetailsContext.Provider
        value={{
          loginDetails,
          uploadLoginDetails: this.uploadLoginDetails,

          passSearchText: this.passSearchText,
          searchText,

          passSearchMoviesList: this.passSearchMoviesList,
          searchMoviesList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:id"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/search" component={Search} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </LoginDetailsContext.Provider>
    )
  }
}

export default App
