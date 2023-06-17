import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import Footer from '../Footer'
import './index.css'

const settings = {
  dots: false,
  infinite: false,

  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    originalsList: [],
    trendingMoviesList: [],
    topRatedList: [],
    title: '',
    overview: '',
    backgroundUrl: '',
    isLoadingOriginalList: true,
    isLoadingTrendingList: true,

    apiStatusOriginalList: true,
    apiStatusTrendingList: true,

    isLoadingTopRatedList: true,
    apiStatusTopRatedList: true,
  }

  componentDidMount() {
    this.getTrendingMoviesList()
    this.getOriginalsList()
    this.getTopRatedList()
  }

  trendingMoviesApiSuccess = trendingMoviesList => {
    const isMobileView = window.innerWidth < 996

    const refinedTrendingMoviesList = trendingMoviesList.map(eachItem => ({
      backgroundWallpaper: isMobileView
        ? eachItem.poster_path
        : eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,

      title: eachItem.title,
    }))
    this.setState({trendingMoviesList: refinedTrendingMoviesList})
  }

  originalsApiSuccess = originalsData => {
    const isMobileView = window.innerWidth < 996

    const refinedoriginalsList = originalsData.map(eachItem => ({
      backgroundWallpaper: isMobileView
        ? eachItem.poster_path
        : eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,
      poster: eachItem.poster_path,
      title: eachItem.title,
    }))

    this.setState({originalsList: refinedoriginalsList})

    const randomItem =
      refinedoriginalsList[
        Math.floor(Math.random() * refinedoriginalsList.length)
      ]

    // const isMobileView = window.innerWidth < 996
    this.setState({
      backgroundUrl: randomItem.backgroundWallpaper,
      overview: randomItem.overview,
      title: randomItem.title,
    })
  }

  topRatedListSuccess = topRatedData => {
    const isMobileView = window.innerWidth < 996

    const refinedTopRatedList = topRatedData.map(eachItem => ({
      backgroundWallpaper: isMobileView
        ? eachItem.poster_path
        : eachItem.backdrop_path,
      id: eachItem.id,
      overview: eachItem.overview,
      poster: eachItem.poster_path,
      title: eachItem.title,
    }))

    this.setState({topRatedList: refinedTopRatedList})
  }

  getTopRatedList = async () => {
    this.setState({isLoadingTopRatedList: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.setState({isLoadingTopRatedList: false})
    if (response.ok) {
      this.topRatedListSuccess(data.results)
    } else {
      this.setState({apiStatusTopRatedList: false})
    }
  }

  getTrendingMoviesList = async () => {
    this.setState({isLoadingTrendingList: true})

    const trendingMoviesApi = 'https://apis.ccbp.in/movies-app/trending-movies'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(trendingMoviesApi, options)
    const data = await response.json()

    this.setState({isLoadingTrendingList: false})

    if (response.ok) {
      this.trendingMoviesApiSuccess(data.results)
    } else {
      this.setState({apiStatusTrendingList: false})
    }
  }

  getOriginalsList = async () => {
    this.setState({isLoadingOriginalList: true})

    const originalMoviesApi = 'https://apis.ccbp.in/movies-app/originals'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(originalMoviesApi, options)
    const originalsData = await response.json()
    this.setState({isLoadingOriginalList: false})

    console.log(originalsData)

    if (response.ok) {
      this.originalsApiSuccess(originalsData.results)
    } else {
      this.setState({apiStatusOriginalList: false})
    }
  }

  retryTrendingList() {
    this.getTrendingMoviesList()
  }

  retryOriginalList() {
    this.getOriginalsList()
  }

  render() {
    const {
      title,
      overview,
      backgroundUrl,
      trendingMoviesList,
      originalsList,
      isLoadingOriginalList,
      isLoadingTrendingList,
      apiStatusOriginalList,
      apiStatusTrendingList,
      topRatedList,
      isLoadingTopRatedList,
      apiStatusTopRatedList,
    } = this.state

    return (
      <div className="HomePageMainContainer1">
        <div className="HomePageMainContainer">
          <Header />
          <div className="homeTopContainer">
            {apiStatusOriginalList && (
              <div
                className="backgroundImageDetails"
                style={{
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: 'cover',
                }}
              >
                {!isLoadingOriginalList && (
                  <div className="homeGradient">
                    <div className="topContainerContext">
                      <h1 className="backgroundTitle">{title}</h1>
                      <p className="backgroundOverview">{overview}</p>
                      <button className="homePlayButton" type="button">
                        Play
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isLoadingOriginalList && (
              <div className="apiErrorContainer1">
                <Loader
                  type="TailSpin"
                  color="#D81F26"
                  height={50}
                  width={50}
                />
              </div>
            )}

            {!apiStatusOriginalList && (
              <div className="apiErrorContainer1">
                <img
                  src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685680331/alert-triangle_fl1snv.png"
                  alt="failure view"
                />
                <p className="errorParaHome">
                  Something went wrong. Please try again
                </p>
                <button type="button" className="homeTryAgainButton">
                  Try Again
                </button>
              </div>
            )}
          </div>

          <div className="homeBottomContainer">
            <div className="slider-container">
              <h1 className="trendingNow">Trending Now</h1>

              {isLoadingTrendingList && (
                <div className="apiErrorContainer3">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              {apiStatusTrendingList && (
                <Slider {...settings}>
                  {trendingMoviesList.map(eachItem => (
                    <li key={eachItem.id}>
                      <Link to={`/movies/${eachItem.id}`}>
                        <img
                          src={eachItem.backgroundWallpaper}
                          className="logo-image"
                          alt={eachItem.title}
                        />
                      </Link>
                    </li>
                  ))}
                </Slider>
              )}

              {!apiStatusTrendingList && (
                <div className="apiErrorContainer3">
                  <img
                    src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685680331/alert-triangle_fl1snv.png"
                    alt="failure view"
                  />
                  <p className="errorParaHome">
                    Something went wrong. Please try again
                  </p>
                  <button
                    type="button"
                    className="homeTryAgainButton"
                    onClick={this.retryTrendingList}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            <div className="slider-container">
              <h1 className="trendingNow">Popular</h1>

              {isLoadingTopRatedList && (
                <div className="apiErrorContainer3">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              {apiStatusTopRatedList && (
                <Slider {...settings}>
                  {topRatedList.map(eachItem => (
                    <li key={eachItem.id}>
                      <Link to={`/movies/${eachItem.id}`}>
                        <img
                          src={eachItem.backgroundWallpaper}
                          className="logo-image"
                          alt={eachItem.title}
                        />
                      </Link>
                    </li>
                  ))}
                </Slider>
              )}

              {!apiStatusTopRatedList && (
                <div className="apiErrorContainer3">
                  <img
                    src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685680331/alert-triangle_fl1snv.png"
                    alt="failure view"
                  />
                  <p className="errorParaHome">
                    Something went wrong. Please try again
                  </p>
                  <button
                    type="button"
                    className="homeTryAgainButton"
                    onClick={this.retryTrendingList}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            <div className="slider-container">
              <h1 className="trendingNow">Originals</h1>
              {isLoadingOriginalList && (
                <div className="apiErrorContainer3">
                  <Loader
                    type="TailSpin"
                    color="#D81F26"
                    height={50}
                    width={50}
                  />
                </div>
              )}

              {apiStatusOriginalList && (
                <Slider {...settings}>
                  {originalsList.map(eachItem => (
                    <li key={eachItem.id}>
                      <Link to={`/movies/${eachItem.id}`}>
                        <img
                          src={eachItem.backgroundWallpaper}
                          className="logo-image"
                          alt={eachItem.title}
                        />
                      </Link>
                    </li>
                  ))}
                </Slider>
              )}

              {!apiStatusOriginalList && (
                <div className="apiErrorContainer3">
                  <img
                    src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685680331/alert-triangle_fl1snv.png"
                    alt="failure view"
                  />
                  <p className="errorParaHome">
                    Something went wrong. Please try again
                  </p>
                  <button
                    type="button"
                    className="homeTryAgainButton"
                    onClick={this.retryOriginalList}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
