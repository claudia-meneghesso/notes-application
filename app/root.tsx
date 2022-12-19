import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
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

export const CatchBoundary = () => {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || "Data not found.";

  return (
    <html lang="en">
      <head>
        <Meta />
        {/* Navigation links */}
        <Links />
        <title>{caughtResponse.statusText}</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{caughtResponse.statusText}</h1>
          <p>{caughtResponse.data?.message || "Data not found."}</p>
          <p>
            Back to <Link to="/">safety</Link>!
          </p>
        </main>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export const ErrorBoundary = ({ error }: { error: { message?: string } }) => (
  <html lang="en">
    <head>
      <Meta />
      {/* Navigation links */}
      <Links />
      <title>An error occurred!</title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className="error">
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>

      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
    type: "text/css",
  },
];
