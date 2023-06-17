import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LoginDetailsContext from '../../context/loginDetailsContext'

import './index.css'

class Account extends Component {
  logOutClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <LoginDetailsContext.Consumer>
        {value => {
          const {loginDetails} = value

          return (
            <div className="accountMainContainer">
              <Header enabled />
              <div className="accountPageContext">
                <div className="accountTextContainer">
                  <h1 className="accountHeading">Account</h1>
                </div>
                <div className="membershipTextContainer">
                  <h1 className="membershipStyle">Membership</h1>
                  <div>
                    <p>{`${loginDetails.username}@gmail.com`}</p>
                    <p className="accountpasswordStyle">Password</p>
                  </div>
                </div>
                <div className="membershipTextContainer">
                  <h1 className="membershipStyle">Plan details</h1>
                  <div className="premiumAccountDetails">
                    <p>Premium</p>
                    <p className="ultrahdDesign">Ultra HD</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="logoutButton"
                  onClick={this.logOutClicked}
                >
                  Logout
                </button>
              </div>
              <Footer />
            </div>
          )
        }}
      </LoginDetailsContext.Consumer>
    )
  }
}

export default Account
