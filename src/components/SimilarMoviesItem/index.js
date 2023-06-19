import {Link} from 'react-router-dom'
import './index.css'

const SimilarMoviesItem = props => {
  const {eachThumbnail, similarItemSelected} = props
  const {backgroundWallpaper, id, title} = eachThumbnail

  const imageSelected = () => {
    similarItemSelected()
  }

  return (
    <li className="similarMoviesItem">
      <Link to={`/movies/${id}`}>
        <img
          src={backgroundWallpaper}
          className="similarMovieImageStyle"
          alt={title}
          onClick={imageSelected}
        />
      </Link>
    </li>
  )
}

export default SimilarMoviesItem
