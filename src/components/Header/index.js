import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {IoMdMoon} from 'react-icons/io'
import {IoLogOut} from 'react-icons/io5'
import {VscThreeBars, VscClose} from 'react-icons/vsc'
import {FiSun} from 'react-icons/fi'
import {
  Button,
  Container,
  Img,
  Item,
  ItemContainer,
  Nav,
  Text,
} from '../../style_component'
import './index.css'

const Header = ({
  theme,
  onChangeTheme,
  history,
  onShowSidebar,
  showSidebar,
}) => (
  <Nav className="header" bg={theme ? '#212121' : 'white'}>
    <Link to="/" className="logo_link">
      <Img
        className="logo"
        height="30px"
        src={
          theme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        }
        alt="website logo"
      />
    </Link>
    <ItemContainer>
      <Item>
        <Button
          className="theme_btn"
          onClick={onChangeTheme}
          data-testid="theme"
        >
          {!theme ? <IoMdMoon color="black" /> : <FiSun color="white" />}
        </Button>
      </Item>
      <Item smHide>
        <Button className="theme_btn">
          <Img
            height="28px"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
        </Button>
      </Item>
      <Item lgHide>
        <Button
          className="theme_btn"
          onClick={onShowSidebar}
          color={theme ? 'white' : 'black'}
        >
          {showSidebar ? <VscClose /> : <VscThreeBars />}
        </Button>
      </Item>
      <Item style={{display: 'flex'}}>
        <Popup
          modal
          trigger={
            <Button color={theme ? 'white' : 'black'}>
              <Text smHide className="btn logout_btn">
                Logout
              </Text>
              <Text lgHide className="out_btn">
                <IoLogOut size={26} />
              </Text>
            </Button>
          }
        >
          {close => (
            <div>
              <Container
                className="popup-container"
                gap="16px"
                bg={theme ? '#212121' : 'white'}
              >
                <Text sm color={theme ? 'white' : '#00306e'}>
                  Are you sure, you want to logout
                </Text>
                <Container row gap="32px">
                  <Button
                    style={{border: `1px solid ${theme ? 'white' : '#3b82f6'}`}}
                    onClick={close}
                    className="btn cancel_btn"
                    color={theme ? 'white' : '#3b82f6'}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      Cookies.remove('jwt_token')
                      history.replace('/login')
                    }}
                    className="btn"
                    bg="#3b82f6"
                    color="white"
                  >
                    Confirm
                  </Button>
                </Container>
              </Container>
            </div>
          )}
        </Popup>
      </Item>
    </ItemContainer>
  </Nav>
)

export default withRouter(Header)
