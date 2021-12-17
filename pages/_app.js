import { Fragment } from "react";
import Header from "../components/MainHeader/Header";
import { AuthContextProvider } from "../components/state/auth-context";
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css";

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return (
    <Fragment>
      <SessionProvider session={session}>
      <AuthContextProvider>
      <Header />
        <Component {...pageProps} />
      </AuthContextProvider>
      </SessionProvider>
    </Fragment>
  );
}

export default MyApp;
