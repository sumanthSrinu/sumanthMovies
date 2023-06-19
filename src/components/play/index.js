import Header from '../Header/index'

import './index.css'

const Play = () => (
  <div className="playMainContainer">
    <Header />
    <div className="playMovieContext">
      <img
        src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684390240/Group_7399_lg8h9m.png"
        alt="login website logo"
        className="headerWebsiteLogo"
      />
      <h1 className="trendingNow">
        Starting at 175 rupees per month and one biryani every week
      </h1>
    </div>
  </div>
)

export default Play
