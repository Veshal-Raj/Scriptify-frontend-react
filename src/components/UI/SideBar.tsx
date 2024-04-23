import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import ReportIcon from '@mui/icons-material/Report';
import { Link } from 'react-router-dom';

export default function SideBar() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState({ ...state, left: open });
    };

    const list = () => (
      <Box
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {[
             { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
             { text: 'Users', icon: <PersonIcon />, path: '/admin/users' },
             { text: 'Blogs', icon: <ArticleIcon />, path: '/admin/blogs' },
             { text: 'Reports', icon: <ReportIcon />, path: '/admin/reports' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
    
  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
