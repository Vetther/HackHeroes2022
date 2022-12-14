import '../styles/globals.scss'
import { AuthProvider } from '../contexts/auth'
import Layout from '../components/Layout'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
  return (
    
    <AuthProvider>
      <Head>
        <title>CitizenHub.pl</title>
      </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AuthProvider>
  )
}

export default MyApp
