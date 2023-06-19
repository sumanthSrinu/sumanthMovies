import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {parseISO, getYear} from 'date-fns'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import GenreItem from '../genreListItem'
import SimilarMoviesItem from '../SimilarMoviesItem'
import Footer from '../Footer'

import './index.css'

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    similarMoviesList: [],
    genresList: [],
    isLoading: true,
    apiStatus: true,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  MinutesToHours = minutes => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    return (
      <p className="durationStyle">
        {hours}h {remainingMinutes}m
      </p>
    )
  }

  extractYear = dateString => {
    const date = parseISO(dateString)
    const year = getYear(date)

    return <p>{year}</p>
  }

  movieDetailsApiSuccess = movieDetailsObj => {
    const movieDetails = {
      adult: movieDetailsObj.movieDetailsObj,
      backgroundImage: movieDetailsObj.backdrop_path,
      budget: movieDetailsObj.budget,
      //   genresList: movieDetailsObj.genres,
      id: movieDetailsObj.id,
      overview: movieDetailsObj.overview,
      poster: movieDetailsObj.poster_path,
      releaseDate: movieDetailsObj.release_date,
      runtime: movieDetailsObj.runtime,
      spokenLanguagesList: movieDetailsObj.spoken_languages,
      title: movieDetailsObj.title,
      voteAverage: movieDetailsObj.vote_average,
      voteCount: movieDetailsObj.vote_count,
    }

    this.setState({
      movieDetails,
      similarMoviesList: movieDetailsObj.similar_movies,
      genresList: movieDetailsObj.genres,
    })
  }

  tryAgainClicked = () => {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const movieDetailsApi = `https://apis.ccbp.in/movies-app/movies/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(movieDetailsApi, options)
    const data = await response.json()
    this.setState({isLoading: false})

    if (response.ok) {
      this.setState({apiStatus: true})
      this.movieDetailsApiSuccess(data.movie_details)
    } else {
      this.setState({apiStatus: false})
    }
  }

  similarItemSelected = () => {
    console.log('triggered')
    this.getMovieDetails()
  }

  render() {
    const {
      movieDetails,
      similarMoviesList,
      genresList,
      isLoading,
      apiStatus,
    } = this.state

    const {
      poster,

      title,
      overview,
      adult,
      budget,
      backgroundImage,

      releaseDate,
      runtime,
      spokenLanguagesList,
      voteAverage,
      voteCount,
    } = movieDetails

    const isLargeScreen = window.innerWidth > 996
    const imageSrc = isLargeScreen ? backgroundImage : poster

    let redefinedLanguages = {}

    let redefinedSimilarMoviesfinal = []

    if (spokenLanguagesList !== undefined) {
      const redefinedSpokenLanguagesList = spokenLanguagesList.map(
        eachItem => ({
          id: eachItem.id,
          language: eachItem.english_name,
        }),
      )
      redefinedLanguages = redefinedSpokenLanguagesList
    }

    if (similarMoviesList !== undefined) {
      const redefinedSimilarMovies = similarMoviesList.map(eachItem => ({
        backgroundWallpaper: eachItem.backdrop_path,
        id: eachItem.id,
        overview: eachItem.overview,
        poster: eachItem.poster_path,
        title: eachItem.title,
      }))

      redefinedSimilarMoviesfinal = redefinedSimilarMovies
    }

    return (
      <div className="movieDetailsPageMainContainer1">
        <div className="movieDetailsContentContainer">
          {apiStatus && (
            <>
              <Header />
              {isLoading && (
                <div className="movieDetailsLoader-container">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              )}
              <div
                className="movieDetailsTopContainer"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'cover',

                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                }}
              >
                <div className="movieDetailsTopContextContainer">
                  <div className="movieDetailsBackgroundImageDetails">
                    <h1 className="backgroundTitle">{title}</h1>
                    <div className="movieDetailsRuntimeContainer">
                      {this.MinutesToHours(runtime)}
                      <p className="certificatepara">{adult ? 'A' : 'U/A'}</p>
                      {this.extractYear(releaseDate)}
                    </div>

                    <p className="backgroundOverview">{overview}</p>
                    <Link to="/play">
                      <button className="movieDetailsPlayButton" type="button">
                        Play
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="movieDetailsBottomContainer">
                <div className="genreAndOthersList">
                  <ul className="genreListContainer">
                    <h1 className="movieItemDetailsTextHeading">Genres</h1>

                    {genresList.length > 0 &&
                      genresList.map(eachItem => (
                        <GenreItem eachgenre={eachItem} key={eachItem.id} />
                      ))}
                  </ul>

                  <ul className="genreListContainer">
                    <h1 className="movieItemDetailsTextHeading">
                      Audio Available
                    </h1>

                    {spokenLanguagesList !== undefined &&
                      redefinedLanguages.map(eachItem => (
                        <p className="genreItemPara">{eachItem.language}</p>
                      ))}
                  </ul>

                  <ul className="genreListContainer">
                    <h1 className="movieItemDetailsTextHeading">Budget</h1>

                    {budget !== undefined && (
                      <p className="genreItemPara">{budget}</p>
                    )}

                    <h1 className="movieItemDetailsTextHeading">
                      Release Date
                    </h1>

                    {releaseDate !== undefined && (
                      <p className="genreItemPara">{releaseDate}</p>
                    )}
                  </ul>

                  <ul className="genreListContainer">
                    <h1 className="movieItemDetailsTextHeading">
                      Rating Count
                    </h1>

                    {voteCount !== undefined && (
                      <p className="genreItemPara">{voteCount}</p>
                    )}

                    <h1 className="movieItemDetailsTextHeading">
                      Rating Average
                    </h1>

                    {voteAverage !== undefined && (
                      <p className="genreItemPara">{voteAverage}</p>
                    )}
                  </ul>
                </div>
                <h1 className="movieDetailsPara2">More like this </h1>
                <ul className="similarMoviesListContainer">
                  {redefinedSimilarMoviesfinal.map(eachItem => (
                    <SimilarMoviesItem
                      eachThumbnail={eachItem}
                      key={eachItem.id}
                      movieDetailsRoute
                      similarItemSelected={this.similarItemSelected}
                    />
                  ))}
                </ul>
                <Footer />
              </div>
            </>
          )}

          {!apiStatus && (
            <>
              <Header enabled />

              {isLoading && (
                <div className="movieDetailsLoader-container">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              <div className="movieDetailsFailureView">
                <img
                  src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685016247/Group_ysew8z.png"
                  alt="failure view"
                />

                <p className="popularFailurePara">
                  {' '}
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
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
