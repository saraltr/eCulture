import { SessionProvider } from "next-auth/react";
import { ReactElement} from 'react';
import { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): ReactElement {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}