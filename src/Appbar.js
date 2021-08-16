import { AppBar, IconButton, InputBase, Toolbar, Typography, Badge } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LokunsLogo from './assets/lokunswhite.png'
import { Link } from 'react-router-dom'
import User from './User'
function AppBarComponent() {
  return (
  <AppBar position="static" style={{"min-width":"400px", backgroundColor:"#1b203c"}}>
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="open drawer"
    >
      <img src={LokunsLogo}/>
    </IconButton>
    <div style={{marginLeft:"auto"}}>
      <IconButton aria-label="show 4 new mails" color="inherit">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={17} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton >
      <Link to="/user"><AccountCircleIcon/></Link>
      </IconButton>
      <IconButton
        aria-label="show more"
        aria-haspopup="true"
        color="inherit"
      >
        <MoreHorizIcon />
      </IconButton>
    </div>
  </Toolbar>

</AppBar>
)
}

export default AppBarComponent