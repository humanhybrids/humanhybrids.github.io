import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "0 1 240px",
    padding: "0 2rem",
    textAlign: "right",
    backgroundColor: "#fff",
    fontFamily: "Roboto Mono",

    "& section": {
      display: "flex",
      flexDirection: "column",
    },

    "& a": {
      textDecoration: "none",
      fontSize: "1.2em",
      padding: "2px 5px",
      color: "#444",
    },

    "& a.selected": {
      textDecoration: "underline",
    },

    "& a:hover:not([href=\".\"])": {
      textDecoration: "dotted underline",
    },

    "& h2": {
      color: "grey",
      fontWeight: "300",
      letterSpacing: "3px",
      textTransform: "uppercase",
    }
  },
}));

export function getCurrentPage(pages) {
  const href = window.location.href || "";
  return pages.find(page => href.includes(page.url)) || pages[0];
}

export function Nav({ pages = [] }) {
  const currentPage = getCurrentPage(pages);
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <h1>Kristie Cook</h1>
      {currentPage.showName && <h2>{currentPage.name}</h2>}
      <section>
        {pages.map(page => (
          <a key={page.url} href={`/${page.url}.html`}
            className={currentPage.url == page.url ? "selected" : ""}>
            {page.name}
          </a>
        ))}
      </section>
    </nav>
  );
}
