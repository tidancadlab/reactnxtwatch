import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  Main,
  Container,
  Form,
  Field,
  Label,
  Img,
  Input,
  Button,
  Text,
} from '../../style_component'
import Store from '../../store'
import './index.css'

const statusCode = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  failed: 'FAILED',
  error: false,
  rejected: 'REJECTED',
}

class Login extends Component {
  state = {
    isError: statusCode.error,
    errorMsg: '',
    username: '',
    password: '',
    showPassword: false,
  }

  onLogin = async e => {
    e.preventDefault()
    const {history} = this.props
    const {username, password} = this.state
    this.setState({
      isError: statusCode.error,
      errorMsg: '',
    })

    try {
      const response = await fetch(`https://apis.ccbp.in/login`, {
        method: 'POST',
        body: JSON.stringify({username, password}),
      })
      const data = await response.json()
      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
        history.replace('/')
      } else {
        this.setState({
          isError: true,
          errorMsg: data.error_msg,
        })
      }
    } catch (error) {
      this.setState({
        isError: true,
        errorMsg: 'Something Went Wrong',
      })
    }
  }

  onUsername = e => {
    this.setState({username: e.target.value})
  }

  onPassword = e => {
    this.setState({password: e.target.value})
  }

  onPasswordShow = () => {
    this.setState(previous => ({showPassword: !previous.showPassword}))
  }

  render() {
    const {isError, errorMsg, showPassword, username, password} = this.state
    if (Cookies.get('jwt_token')) {
      const {history} = this.props
      history.replace('/')
      return false
    }
    return (
      <Store.Consumer>
        {value => {
          const {theme} = value
          return (
            <Main className="main" dark={theme}>
              <Container>
                <Form className="" dark={theme} onSubmit={this.onLogin}>
                  <Img
                    className="logo"
                    width="30%"
                    src={
                      theme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                    }
                    alt="website logo"
                  />
                  <Field>
                    <Label htmlFor="username">USERNAME</Label>
                    <Input
                      type="text"
                      id="username"
                      dark={theme}
                      onChange={this.onUsername}
                      value={username}
                      placeholder="Username"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="password">PASSWORD</Label>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      dark={theme}
                      onChange={this.onPassword}
                      value={password}
                      placeholder="Password"
                    />
                  </Field>
                  <Field row>
                    <Input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onClick={this.onPasswordShow}
                      readOnly
                    />
                    <Label htmlFor="showPassword">Show Password</Label>
                  </Field>
                  <Button
                    position="stretch"
                    className="btn"
                    bg="#3b82f6"
                    color="#ffffff"
                    type="submit"
                  >
                    Login
                  </Button>
                  {isError && <Text className="error_text">*{errorMsg}</Text>}
                </Form>
              </Container>
            </Main>
          )
        }}
      </Store.Consumer>
    )
  }
}
export default Login
