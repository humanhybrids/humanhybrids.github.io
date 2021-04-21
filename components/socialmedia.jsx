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
  { url: "1" },
  { url: "2" },
  { url: "3" },
  { url: "5" },
  { url: "6" },
  { url: "7" },
  { url: "8" },
  { url: "9" },
  { url: "10" },
  { url: "11" },
  { url: "12" },
];

export function SocialMedia() {
  const classes = useStyles();

  return (
    <Layout>
      <Gallery
        columns={2}
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

ReactDOM.render(<SocialMedia />, document.querySelector('main'));