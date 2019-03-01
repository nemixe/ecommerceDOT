import GLayout from '../components/_layout'
import Link from 'next/link'

import { Form, Input, Button, Row, Col, message } from 'antd'
const FormItem = Form.Item

export default class extends React.Component {
  render() {
    return (
      <GLayout title="Login" description="Login page">

        <h1>
          Login
        </h1>

        {/* {this.state.error ? <div>{this.state.error}</div> : null} */}
        <Row type="flex" align="middle">
          <Col span={10}>
            <Form onSubmit={this.loginHandler}>
              <FormItem>
                <input placeholder="Email" type="text" name="email" ref="email" className="ant-input" />
              </FormItem>
              <FormItem>
                <input placeholder="Password" type="password" name="password" ref="password" className="ant-input" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">Login</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Link href="/register">
          <a>Register</a>
        </Link>

      </GLayout>
    )
  }
}