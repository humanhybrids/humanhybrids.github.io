import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { GridList, GridListTile, Backdrop } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, bindKeyboard } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(bindKeyboard(SwipeableViews));

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
  },
  gridItem: {
    cursor: "pointer",
  },
}));

export function Gallery({
  items = [],
  maxItems = [],
  autoPlay = false,
  cellHeight = 360,
  columns = 3,
  onChangeIndex = (index) => { },
  onClose = () => { },
}) {
  const classes = useStyles();
  const [{ selectedIndex, showFullscreen }, setState] = useState({
    selectedIndex: 0,
    showFullscreen: false,
  });

  const setIndex = (index) => {
    setState({ selectedIndex: index, showFullscreen: true });
    onChangeIndex(index);
  };

  const handleChangeIndex = (index) => {
    setState((previousState) => ({ ...previousState, selectedIndex: index }));
    onChangeIndex(index);
  }

  const handleClose = () => {
    setState((previousState) => ({ ...previousState, showFullscreen: false }));
    onClose();
  };

  return (
    <>
      <GridList cellHeight={cellHeight} cols={columns}>
        {items.map((item, index) => (
          <GridListTile className={classes.gridItem} key={item.id} cols={1}
            onClick={() => setIndex(index)}>
            {item.component}
          </GridListTile>
        ))}
      </GridList>
      <Backdrop className={classes.backdrop} open={showFullscreen}
        onClick={handleClose}>
        <AutoPlaySwipeableViews
          index={selectedIndex}
          onChangeIndex={handleChangeIndex}
          enableMouseEvents
          interval={5000}
          autoplay={autoPlay}
        >
          {items.map((item, index) => (
            <div key={item.id} className={classes.center}>
              {Math.abs(selectedIndex - index) <= 2 ? maxItems[index].component : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Backdrop>
    </>
  );
}
