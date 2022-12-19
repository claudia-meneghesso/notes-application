import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// Styles
import styles from "~/styles/main.css";

// Components
import MainNavigation from "./components/MainNavigation/MainNavigation";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        {/* Navigation links */}
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {/* Content of the app */}
        <Outlet />

        {/* Utility components  */}
        {/* Restore position after scrolling */}
        <ScrollRestoration />

        {/* Injecting Client-side scripts */}
        <Scripts />

        {/* Hot-reload */}
        <LiveReload />
      </body>
    </html>
  );
}

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
    type: "text/css",
  },
];
