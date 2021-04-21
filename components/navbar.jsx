import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Drawer, Box, useScrollTrigger, Slide } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    fontFamily: "Montserrat"
  },
  topText: {
    alignItems: "baseline",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function NavBar({ children, pageName }) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <HideOnScroll>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.menuButton}
              color="inherit" aria-label="menu"
              onClick={() => setIsOpen((previousOpen) => !previousOpen)}>
              <MenuIcon />
            </IconButton>
            <Box className={classes.topText}>
              <Typography className={classes.logo} variant="h6" color="inherit">
                KC
              </Typography>&nbsp;
              {pageName &&
                <Typography variant="subtitle1">
                  {pageName}
                </Typography>}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          {children}
        </Drawer>
      </div>
    </HideOnScroll>
  );
}
