// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'

// import Header from '../Header'
// import MovieThumbnailItem from '../MovieThumbnailItem'

// import './index.css'

// class Popular extends Component {
//   state = {popularMoviesList: [], apiStatus: true, isLoading: true}

//   componentDidMount() {
//     this.getPopularMoviesList()
//   }

//   tryAgainClicked = () => {
//     this.getPopularMoviesList()
//   }

//   popularApiSuccess = popularList => {
//     this.setState({apiStatus: true})
//     const refinedPopularMoviesList = popularList.map(eachItem => ({
//       backgroundWallpaper: eachItem.backdrop_path,
//       id: eachItem.id,
//       overview: eachItem.overview,
//       poster: eachItem.poster_path,
//       title: eachItem.title,
//     }))
//     this.setState({popularMoviesList: refinedPopularMoviesList})
//   }

//   getPopularMoviesList = async () => {
//     this.setState({isLoading: true})
//     const jwtToken = Cookies.get('jwt_token')

//     const popularMoviesApi = 'https://apis.ccbp.in/movies-app/popular-movies'

//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }

//     const response = await fetch(popularMoviesApi, options)
//     const data = await response.json()
//     console.log(data)
//     this.setState({isLoading: false})

//     if (response.ok) {
//       this.popularApiSuccess(data.results)
//     } else {
//       this.setState({apiStatus: false})
//     }
//   }

//   render() {
//     const {popularMoviesList, apiStatus, isLoading} = this.state
//     console.log(apiStatus)

//     return (
//       <div className="popularMainContainer">
//         {apiStatus && (
//           <>
//             <Header />
//             {isLoading && (
//               <div className="loaderContainer">
//                 <div className="loader-container"  >
//                   <Loader
//                     type="TailSpin"
//                     color="#D81F26"
//                     height={50}
//                     width={50}
//                   />
//                 </div>
//               </div>
//             )}
//             <ul className="popularMoviesListContainer">
//               {popularMoviesList.map(eachItem => (
//                 <MovieThumbnailItem
//                   eachThumbnail={eachItem}
//                   key={eachItem.id}
//                 />
//               ))}
//             </ul>
//           </>
//         )}

//         {!apiStatus && (
//           <>
//             <Header enabled />
//             {isLoading && (
//               <div className="loaderContainer">
//                 <div className="loader-container"  >
//                   <Loader
//                     type="TailSpin"
//                     color="#D81F26"
//                     height={50}
//                     width={50}
//                   />
//                 </div>
//               </div>
//             )}
//             <div className="popularFailureViewContainer">
//               <img
//                 src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685016247/Group_ysew8z.png"
//                 alt="failure view"
//               />

//               <p className="popularFailurePara">
//                 {' '}
//                 Something went wrong, Please try again.
//               </p>
//               <button
//                 type="button"
//                 onClick={this.tryAgainClicked}
//                 className="popularFailureButton"
//               >
//                 Try Again
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     )
//   }
// }

// export default Popular

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import MovieThumbnailItem from '../MovieThumbnailItem'
import Footer from '../Footer'

import './index.css'

class Popular extends Component {
  state = {
    popularMoviesList: [],
    apiStatus: true,
    isLoading: true,
    currentPage: 1,
    itemsPerPage: 10,
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  tryAgainClicked = () => {
    this.getPopularMoviesList()
  }

  popularApiSuccess = popularList => {
    const isMobileView = window.innerWidth < 996

    this.setState({itemsPerPage: isMobileView ? 12 : 16})

    this.setState({apiStatus: true})
    const refinedPopularMoviesList = popularList.map(eachItem => ({
      backgroundWallpaper: eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,
      poster: eachItem.poster_path,
      title: eachItem.title,
    }))
    this.setState({popularMoviesList: refinedPopularMoviesList})
  }

  getPopularMoviesList = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')

    const popularMoviesApi = 'https://apis.ccbp.in/movies-app/popular-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(popularMoviesApi, options)
    const data = await response.json()
    console.log(data)
    this.setState({isLoading: false})

    if (response.ok) {
      this.popularApiSuccess(data.results)
    } else {
      this.setState({apiStatus: false})
    }
  }

  handlePageChange = pageNumber => {
    this.setState({currentPage: pageNumber})
  }

  render() {
    const {
      popularMoviesList,
      apiStatus,
      isLoading,
      currentPage,
      itemsPerPage,
    } = this.state
    const totalPages = Math.ceil(popularMoviesList.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = popularMoviesList.slice(
      indexOfFirstItem,
      indexOfLastItem,
    )

    return (
      <div className="popularMainContainer">
        {apiStatus && (
          <>
            <Header />
            {isLoading && (
              <div className="loaderContainer">
                <div className="loader-container">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              </div>
            )}
            <ul className="popularMoviesListContainer">
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
          </>
        )}

        {!apiStatus && (
          <>
            <Header enabled />
            {isLoading && (
              <div className="loaderContainer">
                <div className="loader-container">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              </div>
            )}
            <div className="popularFailureViewContainer">
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685016247/Group_ysew8z.png"
                alt="failure view"
              />
              <p className="popularFailurePara">
                Something went wrong, Please try again.
              </p>
              <button
                type="button"
                onClick={this.tryAgainClicked}
                className="popularFailureButton"
              >
                Try Again
              </button>
            </div>
          </>
        )}
        <Footer />
      </div>
    )
  }
}

export default Popular
