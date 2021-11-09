//A custom Document is commonly used to augment your application's <html> and <body> tags. This is necessary because Next.js injects some stylesheets into the DOM using the custom Document.
// To override the default Document, create the file app/pages/_document.tsx and extend the Document class
import Document, { Head, Html, Main, NextScript } from 'next/document'
// <Html>, <Head />, <Main /> and <NextScript /> are required for the page to be properly rendered.
import React from 'react'
import { ServerStyleSheets } from '@material-ui/core/styles'

// Document is only rendered in the server, event handlers like onClick won't work.

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Render app and page and get the context of the page with collected side effects.
    const sheet = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheet.getStyleElement(),
      ],
    }
  }

  rendor() {
    ;<Html>
      <Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Head>
    </Html>
  }
}

export default MyDocument
