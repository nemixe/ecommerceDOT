import Head from 'next/head'
import Proptypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
// import { Link } from '../routes'
import {
  Layout, Menu, Icon, Badge
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout

class GLayout extends React.Component {
  state = {
    count: this.props.cart.length
  }

  render() {

    return (
      <div role="main">
        <Head>
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.description} />
        </Head>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={this.props.route ? [this.props.route] : ['']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"><Link href="/"><a>Home</a></Link></Menu.Item>
              <Menu.Item key="2"><Link href="/stores"><a>Toko</a></Link></Menu.Item>
              <Menu.Item key="3" style={{ float: "right" }}><Link href="/login"><a>Login</a></Link></Menu.Item>
              <Menu.Item key="4" style={{ float: "right" }}>
                <Link href="/cart">
                  <a>
                    <Badge count={this.props.cart.length}>
                      <Icon type="shopping-cart" />
                    </Badge>
                  </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0, position: 'sticky' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{
                background: '#fff', padding: 24, margin: 0, minHeight: 280,
              }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>

      </div>
    )
  }
}

GLayout.propTypes = {
  title: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired
}

export default connect(({ cart }) => { return { cart } })(GLayout)