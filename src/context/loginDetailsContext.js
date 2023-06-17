import React from 'react'

const LoginDetailsContext = React.createContext({
  loginDetails: {},

  uploadLoginDetails: () => {},

  searchText: '',
  passSearchText: () => {},

  searchMoviesList: [],
  passSearchMoviesList: () => {},
})

export default LoginDetailsContext
