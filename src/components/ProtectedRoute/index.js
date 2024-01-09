import Cookies from 'js-cookie'
import {Route, Redirect} from 'react-router-dom'
import {Container, Main} from '../../style_component'
import Header from '../Header'
import Store from '../../store'
import Sidebar from '../Sidebar'

const ProtectedRoute = props => {
  if (!Cookies.get('jwt_token')) {
    return <Redirect to="/login" />
  }

  return (
    <Store.Consumer>
      {value => {
        const {theme, onChangeTheme, showSidebar, onShowSidebar} = value
        return (
          <Main dark={theme} className="main_container">
            <Header
              theme={theme}
              onChangeTheme={onChangeTheme}
              onShowSidebar={onShowSidebar}
              showSidebar={showSidebar}
            />
            <Container className="junction_container">
              <Sidebar theme={theme} show={showSidebar} />
              <Route {...props} />
            </Container>
          </Main>
        )
      }}
    </Store.Consumer>
  )
}
export default ProtectedRoute
