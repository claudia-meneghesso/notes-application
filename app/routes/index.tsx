import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "~/styles/home.css";

const Index: FC = () => (
  <main id="content">
    <h1>A better way of keeping track of your notes</h1>
    <p>Try our early beta and never loose track of your notes again!</p>
    <p id="cta">
      <Link to="/notes">Try Now!</Link>
    </p>
  </main>
);

export default Index;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
    type: "text/css",
  },
];
