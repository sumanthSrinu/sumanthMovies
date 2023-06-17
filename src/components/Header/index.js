import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import LoginDetailsContext from '../../context/loginDetailsContext'
import './index.css'

class Header extends Component {
  state = {
    menuClicked: false,
    accountPathClicked: false,
    searchEnabled: false,
    searchText: '',
  }

  componentDidMount() {
    const {enabled, searchEnabled} = this.props
    this.setState({accountPathClicked: enabled, searchEnabled})
  }

  searchStarted = event => {
    this.setState({searchText: event.target.value})
  }

  searchClicked = () => {
    const {searchText} = this.state

    const {passSearchText} = this.context
    passSearchText(searchText)
  }

  menuIconClicked = () => {
    this.setState({menuClicked: true})
  }

  closeIconClicked = () => {
    this.setState({menuClicked: false})
  }

  homeRouteClicked = () => {
    this.setState({accountPathClicked: false})
  }

  popularRouteClicked = () => {
    this.setState({accountPathClicked: false})
  }

  render() {
    const {
      menuClicked,
      accountPathClicked,
      searchEnabled,
      searchText,
    } = this.state

    return (
      <div className="headerMainContainer">
        <div className="headerTopContainer">
          <div className="headerLogoAndRoutes">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684390240/Group_7399_lg8h9m.png"
                alt="login website logo"
                className="headerWebsiteLogo"
              />
            </Link>

            <ul className="desktopHeaderRoutes">
              <li className="linkStyleHeaders">
                <Link
                  to="/"
                  className="linkItemHeader "
                  onClick={this.homeRouteClicked}
                >
                  Home
                </Link>
              </li>

              <li className="linkStyleHeaders">
                <Link
                  to="/popular"
                  className="linkItemHeader "
                  onClick={this.popularRouteClicked}
                >
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          {searchEnabled ? (
            <div className="searchRouteContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInputStyle"
                onChange={this.searchStarted}
              />

              <button
                type="button"
                // testid="searchButton"
                className="searchRouteButton"
                onClick={this.searchClicked}
              >
                <img
                  src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1685068217/search_xqmsmx.png"
                  alt="searchIcon"
                  className="searchRouteIcon"
                />
              </button>
            </div>
          ) : null}
          <div className="searchMenuContainer">
            {accountPathClicked ? null : (
              <Link to="/search">
                <img
                  src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684404074/search_vz8ibp.png"
                  alt="searchIcon"
                />
              </Link>
            )}

            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684492690/Avatar_tr3mwh.png"
                alt="profile"
                className="profileRoute"
              />
            </Link>

            <img
              src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684404703/add-to-queue_1_oegroa.png"
              alt="menuIcon"
              onClick={this.menuIconClicked}
              className="menuIconHeader"
            />
          </div>
        </div>

        {menuClicked && (
          <ul className="headerRoutesContainer">
            <li>
              <Link to="/" className="linkItemHeader ">
                Home
              </Link>
            </li>

            <li>
              <Link to="/popular" className="linkItemHeader ">
                Popular
              </Link>
            </li>

            <li>
              <Link
                to="/account"
                className="linkItemHeader "
                onClick={this.accountPathClicked}
              >
                Account
              </Link>
            </li>

            <button
              type="button"
              className="closeMenuButton"
              onClick={this.closeIconClicked}
            >
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684489804/Solid_fcykva.png"
                alt="headerCloseButton"
              />
            </button>
          </ul>
        )}
      </div>
    )
  }
}

Header.contextType = LoginDetailsContext

export default Header
