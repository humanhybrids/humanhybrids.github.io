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
    height: "100%",
    marginLeft: 0,
  },
  profileImage: {
    marginBottom: "16px",
    maxWidth: "100%",
  },
  signature: {
    display: "block",
    margin: "auto",
    width: "180px",
  },
}));

export function Index() {
  const classes = useStyles();

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <img className={classes.profileImage} src="/images/profile.png" />
        <Typography variant="body1" paragraph>
          Kristie Cook is a digital media artist from the San Francisco Bay
          Area. She is an interdisciplinary artist who explores concepts of
          digital technology in society through photography, videography, motion
          graphics, and mixed media.
        </Typography>
        <Typography variant="body1" paragraph>
          Kristie graduated from California State University, San Bernardino
          with a BA in English Literature. She then studied at San Jose State
          University and graduated in 2019 with a BFA in Digital Media Art. She
          has exhibited her art in galleries throughout the Bay Area.
        </Typography>
        <Typography variant="body1" paragraph>
          Her work has been shown in galleries in San Jose, at the 2018 Maker's
          Faire in San Mateo, and at B4BEL4b in Oakland. Her film, The Next
          Step, won the Jury Award and the Audience Award from Campus Movie Fest
          in 2018. Kristie was a Social Media and Website Development Manager
          with the SJSU Art and Art History Department and a Social Media
          Liaison with the SJSU Art Galleries.
        </Typography>
        <Typography variant="body1" paragraph>
          She currently spends her time creating art works in her studio in
          San Jose.
        </Typography>
        <img className={classes.signature} src="/images/initials.png" />
      </Container>
    </Layout>
  );
}

ReactDOM.render(<Index />, document.querySelector('main'));