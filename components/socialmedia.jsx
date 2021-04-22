import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout.jsx';
import { Gallery } from './gallery.jsx';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  maxSize: {
    maxWidth: "100vw",
    maxHeight: "95vh",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  stepper: {
    flexGrow: 1,
  }
}));

const images = [
  { url: "social-ala" },
  { url: "social-art-class" },
  { url: "social-class" },
  { url: "social-commencement" },
  { url: "social-gallim" },
  { url: "social-gallim-why" },
  { url: "social-gender" },
  { url: "social-grad-deadline" },
  { url: "social-greg" },
  { url: "social-hands" },
  { url: "social-powers" },
  { url: "social-smd" },
  // { url: "social-shelea" },
  { url: "social-woody" },
  { url: "social-yellow" },
];

export function SocialMedia() {
  const classes = useStyles();

  const thumbnails = images.map((image) => ({
    id: image.url,
    component: <img src={`../images-sm/${image.url}-sm.jpg`} />,
  }));

  const maxItems = images.map((image) => ({
    id: image.url,
    component: <img className={classes.maxSize} src={`../images-lg/${image.url}.jpg`} />,
  }));

  return (
    <Layout>
      <Hidden smUp>
        <Gallery
          columns={1}
          items={thumbnails}
          maxItems={maxItems} />
      </Hidden>
      <Hidden xsDown>
        <Gallery
          columns={3}
          items={thumbnails}
          maxItems={maxItems} />
      </Hidden>
    </Layout>
  );
}

ReactDOM.render(<SocialMedia />, document.querySelector('main'));