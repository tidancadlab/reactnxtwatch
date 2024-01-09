import {Link, withRouter} from 'react-router-dom/cjs/react-router-dom.min'
import {IoMdHome} from 'react-icons/io'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {
  Container,
  Img,
  Item,
  ItemContainer,
  SideBar,
  Text,
} from '../../style_component'

const linkItem = [
  {id: 1, name: 'Home', link: '/', icon: IoMdHome},
  {id: 2, name: 'Trending', link: '/trending', icon: AiFillFire},
  {id: 3, name: 'Gaming', link: '/gaming', icon: SiYoutubegaming},
  {id: 4, name: 'Saved videos', link: '/saved-videos', icon: MdPlaylistAdd},
]

const socialMediaList = [
  {
    id: 1,
    name: 'facebook logo',
    link:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png',
  },
  {
    id: 2,
    name: 'twitter logo',
    link:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png',
  },
  {
    id: 3,
    name: 'linked in logo',
    link:
      'https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png',
  },
]

const Sidebar = ({theme, location, show}) => (
  <SideBar bg={theme ? '#212121' : 'white'} show={show}>
    <ItemContainer className="link_container">
      {linkItem.map(value => (
        <Link
          key={value.id}
          to={value.link}
          className={`${
            location.pathname === value.link &&
            (theme ? 'active-dark' : 'active')
          } link`}
        >
          <Item className="item" color={theme ? 'white' : 'black'}>
            <value.icon color={location.pathname === value.link ? 'red' : ''} />
            <Text>{value.name}</Text>
          </Item>
        </Link>
      ))}
    </ItemContainer>
    <Container className="social_media" align="flex-start">
      <Text size="14px">CONTACT US</Text>
      <ItemContainer className="">
        {socialMediaList.map(value => (
          <Item key={value.id}>
            <Img width="30px" src={value.link} alt={value.name} />
          </Item>
        ))}
      </ItemContainer>
      <Text size="14px">
        Enjoy! Now to see your channels and recommendations!
      </Text>
    </Container>
  </SideBar>
)

export default withRouter(Sidebar)
