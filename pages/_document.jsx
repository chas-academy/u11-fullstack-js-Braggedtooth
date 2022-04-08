import { createStylesServer, ServerStyles } from '@mantine/next'
import Document, { Head, Html, Main, NextScript } from 'next/document'

const stylesServer = createStylesServer()

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer}/>
        </>
      )
    }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    )
  }
}

export default MyDocument
