import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Box, Hidden, ThemeProvider, createMuiTheme, Grid } from '@material-ui/core';
import { NavBar } from './navbar.jsx';
import { Nav, getCurrentPage } from './nav.jsx';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  menu: {
    backgroundColor: "#fff",
  },
  fillHeight: {
    height: "100%",
  },
  smallBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
  },
});

const pages = [
  { url: "index", name: "Home", showName: false },
  { url: "photos", name: "Photos", showName: true },
  { url: "videos2", name: "Videos", showName: true },
  { url: "socialmedia2", name: "Social Media", showName: true },
  { url: "design2", name: "Graphic Design", showName: true },
];

export function Layout({ children }) {
  const currentPage = getCurrentPage(pages);
  const classes = useStyles();

  const [] = useState({
    isOpen: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Hidden smUp>
          <Box className={classes.smallBox}>
            <NavBar className={classes.menu} pageName={currentPage.showName && currentPage.name}>
              <Nav pages={pages} />
            </NavBar>
            {children}
          </Box>
        </Hidden>
        <Hidden xsDown>
          <Grid container alignContent="stretch" alignItems="stretch" className={classes.fillHeight}>
            <Grid className={classes.menu} item md={3} sm={4}>
              <Nav pages={pages} />
            </Grid>
            <Grid item md={9} sm={8}>
              {children}
            </Grid>
          </Grid>
        </Hidden>
      </Box>
    </ThemeProvider>
  );
}
