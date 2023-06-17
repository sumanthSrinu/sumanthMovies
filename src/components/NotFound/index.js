import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfoundMainContainer">
    <div className="notFoundContextContainer">
      <h1 className="notFoundTitle">Lost Your Way ?</h1>
      <p className="notFoundPara">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>

      <Link to="/">
        <button type="button" className="notfoundButton">
          {' '}
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
