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
      <Video src="/videos/jazzgif.mp4" className={classes.maxSize} />
    ),
  },
  {
    url: "sunrays.jpg",
    component: (classes) => (
      <Video src="/videos/sunrays.mp4" className={classes.maxSize} />
    ),
  },
  {
    url: "sjsu-galleries-arts.jpg",
    component: (classes) => (
      <Video src="/videos/sjsu-galleries-arts.mp4" className={classes.maxSize} />
    ),
  },
  {
    url: "welcomeback.jpg",
    component: (classes) => (
      <Video src="/videos/welcomeback.mp4" className={classes.maxSize} />
    ),
  },
];

function Video(props) {
  return <video autoPlay loop muted playsInline {...props}></video>;
}

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