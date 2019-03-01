import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <html lang="id">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#ff6600" />
          <meta name="apple-mobile-web-app-title" content="NextJSProject" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <link rel="manifest" href="/static/manifest.webmanifest" />
          <link rel="shorcut icon" href="/static/icon.png" />
          <link rel="apple-touch-icon" href="/static/icon.png" />
        </Head>
        <Main />
        <NextScript />
      </html>
    )
  }
}