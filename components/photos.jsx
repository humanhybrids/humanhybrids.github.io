import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from './layout.jsx';
import { Gallery } from './gallery.jsx';

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
  { url: "gallim-03809" },
  { url: "gallim-03771" },
  { url: "gallim-03727" },
  { url: "gallim-03696" },
  { url: "gallim-03319" },
  { url: "gallim-03272" },
  { url: "gallim-03000" },
  { url: "gallim-02991" },
  { url: "gallim-02274" },
  { url: "Gallim-02318" },
  { url: "Gallim-01789" },
  { url: "Gallim-01675" },
  { url: "headshot" },
  { url: "james" },
  { url: "bear" },
  { url: "Davis-5085" },
  { url: "Davis-5075" },
];

export function Photos() {
  const classes = useStyles();

  return (
    <Layout>
      <Gallery
        items={images.map((image) => ({
          id: image.url,
          component: <img src={`../images-sm/${image.url}.jpg`} />,
        }))}
        maxItems={images.map((image) => ({
          id: image.url,
          component: <img className={classes.maxSize} src={`../images-lg/${image.url}.jpg`} />,
        }))} />
    </Layout>
  );
}

ReactDOM.render(<Photos />, document.querySelector('main'));