import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import LoginDetailsContext from '../../context/loginDetailsContext'

import './index.css'

class Login extends Component {
  state = {usernameText: '', passwordText: '', loginStatus: true, errorMsg: ''}

  LoginSuccess = data => {
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})

    const {history} = this.props
    history.replace('/')

    const {uploadLoginDetails} = this.context
    const {usernameText, passwordText} = this.state

    uploadLoginDetails({
      username: usernameText,
      password: passwordText,
    })

    this.setState({usernameText: '', passwordText: ''})
  }

  userInputChanged = event => {
    this.setState({usernameText: event.target.value})
  }

  passwordInputChanged = event => {
    this.setState({passwordText: event.target.value})
  }

  loginClicked = async event => {
    event.preventDefault()

    const {usernameText, passwordText} = this.state

    const userDetails = {username: usernameText, password: passwordText}

    const loginUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      this.LoginSuccess(data)
    } else {
      this.setState({loginStatus: false, errorMsg: data.error_msg})
    }
  }

  render() {
    const {passwordText, usernameText, loginStatus, errorMsg} = this.state
    const userDetails = {username: usernameText, password: passwordText}

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <LoginDetailsContext.Consumer>
        {value => {
          const {uploadLoginDetails} = value

          const updateLoginDetails = () => {
            uploadLoginDetails(userDetails)
          }

          return (
            <div className="loginMainContainer">
              <img
                src="https://res.cloudinary.com/dtnsnrzmf/image/upload/v1684390240/Group_7399_lg8h9m.png"
                alt="login website logo"
                className="loginWebsiteLogo"
              />

              <form
                className="LoginFormContainer"
                onSubmit={updateLoginDetails}
              >
                <h1 className="loginText">Login</h1>
                <div className="LoginInputContainer">
                  <label htmlFor="userNameInput" className="loginLabelStyle">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="userNameInput"
                    className="loginInputStyle"
                    onChange={this.userInputChanged}
                    value={usernameText}
                  />
                </div>
                <div className="LoginInputContainer">
                  <div className="passwordContainer">
                    <label htmlFor="passwordInput" className="loginLabelStyle">
                      PASSWORD
                    </label>
                  </div>

                  <input
                    type="password"
                    id="passwordInput"
                    className="loginInputStyle"
                    onChange={this.passwordInputChanged}
                    value={passwordText}
                  />
                </div>

                {!loginStatus && <p className="loginErrorMsg">{errorMsg}</p>}

                <button
                  type="submit"
                  className="loginButton"
                  onClick={this.loginClicked}
                >
                  Login
                </button>
              </form>
            </div>
          )
        }}
      </LoginDetailsContext.Consumer>
    )
  }
}
Login.contextType = LoginDetailsContext

export default Login
