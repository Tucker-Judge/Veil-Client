import Document, { Html, Head, Main, NextScript } from 'next/document';
import i18nextConfig from '../../next-i18next.config';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { req } = ctx;
    const locale = req.locale || i18nextConfig.i18n.defaultLocale;

    return { ...initialProps, locale };
  }

  render() {
    const { locale } = this.props;

    return (
      <Html lang={locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

