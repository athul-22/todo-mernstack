import Layout from '../components/Layout'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

function Auth() {
  return (
    <Layout>
        <div>
            <Login/>
            <Register/>
        </div>
    </Layout>

  )
}

export default Auth