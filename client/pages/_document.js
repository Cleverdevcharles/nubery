import Document, {
  Head as NextHead,
  Html,
  Main,
  NextScript,
} from 'next/document'
// import bundleCss from '!raw-loader!../styles/tailwindSSR.css';
import bundleCss from '!raw-loader!../styles/tailwindSSR.css'

/**
 * we extend and tweak next js HEAD here
 */
class Head extends NextHead {
  getCssLinks(files) {
    if (process.env.NODE_ENV !== 'production') {
      return super.getCssLinks(files)
    }

    // do not return any css files in production
    return []
  }
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
	 
    return {
      ...initialProps,
      styles: [
        ...initialProps.styles,

        process.env.NODE_ENV === 'production' ? (
          <style
            key="custom"
            dangerouslySetInnerHTML={{
              __html: bundleCss,
            }}
          />
        ) : (
          <></>
        ),
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/css/rt-plugins.css" />
          <link rel="stylesheet" href="/css/main.css" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.jpg" />
          <meta
            name="description"
            content="Nubery is a DeFi TVL aggregator. It is committed to providing accurate data without ads or sponsored content, as well as transparency."
          />

          <meta property="og:title" content="Nubery" />
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content={windowURL} /> */}
          <meta property="og:site_name" content="Nubery" />
          <meta
            property="og:description"
            content="Nubery is an e-learning site that allow people to find the best course online and learn with expert anytime, anywhere."
          />
          {/* <meta property="og:image" content={cardURL} /> */}

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="dappview.com" />
          {/* <meta property="twitter:url" content={windowURL} /> */}
          <meta name="twitter:title" content="Nubery" />
          <meta name="twitter:site" content="@Nubery" />
          <meta name="twitter:creator" content="@Nubery" />
          <meta
            name="twitter:description"
            content="Nubery is an e-learning site that allow people to find the best course online and learn with expert anytime, anywhere."
          />
        </Head>
        {/** <------------------- render the tweaked head here */}
        <body>
          <Main />
          <NextScript />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
          <script src="/js/rt-plugins.js"></script>
          <script src="/js/app.js"></script>
        </body>
      </Html>
    )
  }
}
