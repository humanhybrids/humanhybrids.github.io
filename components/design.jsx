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
  { url: "PosterPrint1.jpg" },
  { url: "PosterPrint2.jpg" },
  { url: "PosterPrint3.jpg" },
  { url: "4.jpg" },
  { url: "still.jpg" },
  {
    url: "jazzgif.jpg",
    component: (classes) => (
      <video autoPlay loop muted playsInline src="/videos/jazzgif.mp4"
        className={classes.maxSize}>
      </video>
    ),
  },
  {
    url: "sunrays.jpg",
    component: (classes) => (
      <video autoPlay loop muted playsInline src="/videos/sunrays.mp4"
        className={classes.maxSize}>
      </video>
    ),
  },
];

export function SocialMedia() {
  const classes = useStyles();

  return (
    <Layout>
      <Gallery
        items={images.map((image) => ({
          id: image.url,
          component: <img src={`/images-sm/${image.url}`} />,
        }))}
        maxItems={images.map((image) => ({
          id: image.url,
          component: image.component?.(classes) || (
            <img className={classes.maxSize} src={`/images-lg/${image.url}`} />
          ),
        }))} />
    </Layout>
  );
}

ReactDOM.render(<SocialMedia />, document.querySelector('main'));