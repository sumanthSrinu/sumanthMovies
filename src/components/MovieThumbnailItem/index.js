// import {Link} from 'react-router-dom'
// import './index.css'

// const MovieThumbnailItem = props => {
//   const {eachThumbnail} = props
//   const {backgroundWallpaper, id, overview, poster, title} = eachThumbnail

//   //   console.log(backgroundWallpaper)

//   return (
//     <li className="thumbnailItemStyle">
//       <Link to={`/movies/${id}`} className="popularLinkItem">
//         <img src={poster} className="thumbnailImage" alt={title} />
//       </Link>
//     </li>
//   )
// }

// export default MovieThumbnailItem

import {Link} from 'react-router-dom'
import './index.css'

const MovieThumbnailItem = props => {
  const {eachThumbnail} = props
  const {backgroundWallpaper, id, overview, poster, title} = eachThumbnail

  //   const isLargeScreen = window.innerWidth > 996
  //   const imageSrc = isLargeScreen ? backgroundWallpaper : poster

  return (
    <li className="popularThumbnailItemStyle">
      <Link to={`/movies/${id}`} className="popularLinkItem">
        <img src={backgroundWallpaper} className="thumbnailImage" alt={title} />
      </Link>
    </li>
  )
}

export default MovieThumbnailItem
