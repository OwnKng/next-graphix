import Head from 'next/head'
import Header from './layout/Header'
import Footer from './layout/Footer'

// eslint-disable-next-line no-undef
interface LayoutProps {pageTitle: string, description: string, children: React.ReactNode}

const Layout = ({ pageTitle, description, children }: LayoutProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="Description" content={description} />
      <title>{pageTitle}</title>
    </Head>
    <body>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </body>
  </>
)

export default Layout
