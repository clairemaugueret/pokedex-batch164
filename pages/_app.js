import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokedex - Batch#164</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
