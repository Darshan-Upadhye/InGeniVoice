// pages/index.tsx

import Head from 'next/head';
import InGeniVoiceWelcome from '../components/InGeniVoiceWelcome';

export default function Home() {
  return (
    <>
      <Head>
        <title>InGeniVoice</title>
        <meta name="description" content="Your AI Voice Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InGeniVoiceWelcome />
    </>
  );
}
