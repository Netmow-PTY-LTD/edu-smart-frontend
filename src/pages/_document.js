import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getStaticProps(ctx) {
    const initialProps = await Document.getStaticProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="google-site-verification"
            content="XwAw52aFflG3emLC8unmaNNf4F1phG6bmLYHjlJS8ys"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
