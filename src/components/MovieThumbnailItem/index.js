import {Link} from 'react-router-dom'
import './index.css'

const MovieThumbnailItem = props => {
  const {eachThumbnail} = props
  const {backgroundWallpaper, id, title} = eachThumbnail

  return (
    <li className="popularThumbnailItemStyle">
      <Link to={`/movies/${id}`} className="popularLinkItem">
        <img src={backgroundWallpaper} className="thumbnailImage" alt={title} />
      </Link>
    </li>
  )
}

export default MovieThumbnailItem
