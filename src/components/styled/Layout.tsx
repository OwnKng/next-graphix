import Header from './layout/Header'
import Footer from './layout/Footer'

// eslint-disable-next-line no-undef
interface LayoutProps {children: React.ReactNode}

const Layout = ({ children }: LayoutProps) => (
  <body>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </body>
)

export default Layout
