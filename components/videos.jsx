import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
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

const videos = [
  {
    url: "/videos/Final Montage - End Credits-small.mp4",
    thumbnail: "/images-sm/Copy of still.jpg",
  },
  {
    url: "/videos/WebsiteVideo-small.mp4",
    thumbnail: "/images-sm/2video.jpg",
  },
  {
    url: "/videos/Join the DMA Program at SJSU-small.mp4",
    thumbnail: "/images-sm/pic1.jpg",
  },
  {
    url: "/videos/MarchingBandPromoUpdated-small.mp4",
    thumbnail: "/images-sm/bandnew.jpg",
  },
  {
    url: "/videos/StarWarsIGstory-small.mp4",
    thumbnail: "/images-sm/4thbewith.jpg",
  },
  {
    url: "//player.vimeo.com/video/209441623",
    component: () => (
      <iframe title="vimeo-player" frameBorder="0" allowFullScreen
        src="//player.vimeo.com/video/209441623" width="640" height="360">
      </iframe>
    ),
    thumbnail: "/images-sm/videos-yellow.jpg",
  },
  {
    url: "/videos/videos-smdredux-small.mp4",
    thumbnail: "/images-sm/videos-smdredux.jpg",
  },
];

export function Videos() {
  const classes = useStyles();

  const [playingVideo, setPlayingVideo] = useState(null);

  const pauseVideo = () => {
    playingVideo?.pause();
    setPlayingVideo(null);
  };

  return (
    <Layout>
      <Gallery
        columns={1}
        onClose={pauseVideo}
        onChangeIndex={pauseVideo}
        items={videos.map((video) => ({
          id: video.url,
          component: <img src={video.thumbnail} />,
        }))}
        maxItems={videos.map((video) => ({
          id: video.url,
          component: video.component?.(classes) || (
            <video onClick={e => e.stopPropagation()} src={video.url} controls
              className={classes.maxSize} onPlay={(e) => setPlayingVideo(e.target)} >
            </video>
          ),
        }))} />
    </Layout>
  );
}

ReactDOM.render(<Videos />, document.querySelector('main'));