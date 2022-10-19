import '../styles/globals.css'
import { AuthProvider } from '../contexts/auth'
import Layout from '../components/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
