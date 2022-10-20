import '../styles/globals.css'
import { AuthProvider } from '../contexts/auth'
import { WidthProvider } from '../contexts/width'
import Layout from '../components/Layout'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Head>
        
      </Head>
      <WidthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WidthProvider>
    </AuthProvider>
  )
}

export default MyApp
