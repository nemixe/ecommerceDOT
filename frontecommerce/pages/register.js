import { Form, Input, Button, Row, Col } from 'antd'
// import { signUp, isAuthenticated, redirectIfAuthenticated } from '../utils/authService'
import GLayout from '../components/_layout'
import Link from 'next/link'

const FormItem = Form.Item

class Register extends React.Component {
  // constructor() {
  //   super()

  //   this.onSubmitHandler = this.onSubmitHandler.bind(this)
  //   this.state = {
  //     error: null
  //   }
  // }

  // static async getInitialProps(ctx) {
  //   if (redirectIfAuthenticated(ctx)) {
  //     return {}
  //   }
  //   return {
  //     authenticated: isAuthenticated(ctx)
  //   }
  // }

  // onSubmitHandler = async e => {
  //   const { email, password } = this.refs

  //   e.preventDefault()
  //   const error = await signUp(email.value, password.value)
  //   this.setState({ error })
  // }

  render() {
    return (
      <GLayout title="Register" description="Create yout account and become the user" auth={this.props.authenticated}>

        <h1>
          Register
        </h1>

        {/* {this.state.error ? <div>{this.state.error}</div> : null} */}
        <Row type="flex" align="middle">
          <Col span={10}>
            <Form onSubmit={this.onSubmitHandler}>
              <FormItem>
                <input className="ant-input" placeholder="Email" type="text" ref="email" id="email" />
              </FormItem>
              <FormItem>
                <input className="ant-input" placeholder="Password" type="password" ref="password" id="password" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>Register</Button>
                <Button><Link href="/login"><a>Login</a></Link></Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </GLayout>
    )
  }
}

export default Register