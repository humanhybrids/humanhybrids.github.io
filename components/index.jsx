import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Drawer, Grid, Box, Hidden, Container } from '@material-ui/core';
import { NavBar } from './navbar.jsx';
import { Nav } from './nav.jsx';
import { Layout } from './layout.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#010101",
    height: "100%",
  },
  img: {
    maxHeight: "100vh",
    maxWidth: "100%",
  }
}));

export function Index() {
  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.root}>
        <img className={classes.img} src="../images-lg/gallim-03319.jpg" />
      </Container>
    </Layout>
  );
}

ReactDOM.render(<Index />, document.querySelector('main'));