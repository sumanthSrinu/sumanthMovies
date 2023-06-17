import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import LoginDetailsContext from '../../context/loginDetailsContext'
import MovieThumbnailItem from '../MovieThumbnailItem'

import Header from '../Header'

import './index.css'

class Search extends Component {
  state = {
    headerSearchText: '',
    apiStatus: null,
    isLoading: false,
    currentPage: 1,
    itemsPerPage: 12,
  }

  componentDidUpdate(prevProps, prevState) {
    const {searchText} = this.context
    const {headerSearchText} = this.state

    if (
      searchText !== prevState.searchText &&
      searchText !== headerSearchText
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({headerSearchText: searchText}, () => {
        this.getSearchItems(searchText)
      })
    }
  }

  reloadSearch = () => {
    this.getSearchItems()
  }

  searchSuccess = moviesList => {
    const isMobileView = window.innerWidth < 996

    this.setState({itemsPerPage: isMobileView ? 15 : 16})

    const {passSearchMoviesList} = this.context

    const redefinedSearchMoviesList = moviesList.map(eachItem => ({
      backgroundWallpaper: eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,
      poster: eachItem.poster_path,
      title: eachItem.title,
    }))

    passSearchMoviesList(redefinedSearchMoviesList)
  }

  getSearchItems = async searchText => {
    this.setState({isLoading: true})
    this.setState({apiStatus: true})

    const jwtToken = Cookies.get('jwt_token')
    const movieSearchApi = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(movieSearchApi, options)
    const data = await response.json()
    this.setState({isLoading: false})
    if (response.ok) {
      this.searchSuccess(data.results)
    } else {
      this.setState({apiStatus: false})
    }
  }

  handlePageChange = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const {
      apiStatus,
      headerSearchText,
      isLoading,
      currentPage,
      itemsPerPage,
    } = this.state

    const {searchMoviesList} = this.context

    const totalPages = Math.ceil(searchMoviesList.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = searchMoviesList.slice(
      indexOfFirstItem,
      indexOfLastItem,
    )

    return (
      <div className="SearchMainContainer">
        <Header searchEnabled enabled />

        {apiStatus && (
          <>
            {isLoading && (
              <div className="searchLoadingContainer">
                <Loader
                  type="TailSpin"
                  color="#D81F26"
                  height={50}
                  width={50}
                />
              </div>
            )}

            <ul className="SearchMoviesListContainer">
              {currentItems.map(eachItem => (
                <MovieThumbnailItem
                  eachThumbnail={eachItem}
                  key={eachItem.id}
                />
              ))}
            </ul>
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  type="button"
                  className="arrowStylePopular"
                >
                  <img
                    src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1686561964/Icon_t5ahg6.png"
                    alt="leftArrow"
                  />
                </button>
              )}

              <p className="pagesCountPara">
                {currentPage} of {totalPages}
              </p>
              {currentPage < totalPages && (
                <button
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  type="button"
                  className="arrowStylePopular"
                >
                  <img
                    src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1686563556/Icon_aqg4vh.png"
                    alt="rightarrow"
                  />
                </button>
              )}
            </div>

            {searchMoviesList.length === 0 && (
              <div className="searchRouteNoMovies">
                <img
                  src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1686138438/Group_7394_k0bpag.png"
                  alt="no movies"
                />
                <p className="searchNoMoviesPara">
                  Your search for {headerSearchText} did not find any matches.
                </p>
              </div>
            )}
          </>
        )}

        {apiStatus === false && (
          <>
            {isLoading && (
              <div className="searchLoadingContainer">
                <Loader
                  type="TailSpin"
                  color="#D81F26"
                  height={50}
                  width={50}
                />
              </div>
            )}
            <div className="searchRouteNoMovies">
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685413828/Group_1_u2smcr.png"
                alt="failure view"
              />
              <p className="searchNoMoviesPara">
                Something went wrong, Please try again.
              </p>
              <button
                type="button"
                onClick={this.reloadSearch}
                className="searchTryAgain"
              >
                Try again
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

Search.contextType = LoginDetailsContext

export default Search
