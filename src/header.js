import { html } from "@polymer/polymer";

class Header extends HTMLElement {
  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      nav {
        margin: 1rem;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      nav[url*="/art" i] > a[href*="/art"],
      nav[url="/index.html" i] > a[href="/index.html"] {
        text-decoration: underline;
      }
    </style>
    <h1><a href="/index.html">humanhybrids</a></h1>
    <slot></slot>
    <nav>
      <a href="/index.html">Home</a>
      <a href="/art/index.html">Art</a>
    </nav>
    `;
  }

  get nav() {
    return this.shadowRoot.querySelector("nav");
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(Header.template.content.cloneNode(true));
    this.nav.setAttribute("url", window.location.pathname);
  }
}

customElements.define("hh-header", Header);
