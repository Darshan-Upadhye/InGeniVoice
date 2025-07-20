import type { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Load ResponsiveVoice BEFORE anything else */}
      <Script
        src="https://code.responsivevoice.org/responsivevoice.js?key=free"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('✅ ResponsiveVoice loaded');
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
