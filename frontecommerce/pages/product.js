import GLayout from '../components/_layout'
import { Carousel, Collapse, Button, Row, Col, InputNumber } from 'antd'
import { connect } from 'react-redux'
import Router from 'next/router'

import { addToCart } from '../actions/addToCart'
import { get } from '../utils/request'
import { setCookie, getCookie, removeCookie } from '../utils/cookie'

const Panel = Collapse.Panel

class Product extends React.Component {
  constructor() {
    super()

    this.state = {
      quantity: 1
    }

    this.listImage = this.listImage.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  static async getInitialProps(ctx) {
    const res = await get(`/products/${ctx.query.id}`)
    const cookie = getCookie('cart', ctx.req)
    return {
      data: res.data,
      cookie: cookie
    }
  }

  listImage() {
    return this.props.data.images.map(image => (
      <div key={image.id_products_picture}><h3>{image.directory}</h3></div>
    ))
  }

  addToCart() {
    // let json = !!this.props.cookie ? JSON.parse(unescape(this.props.cookie)) : null
    let product = {
      id_product: this.props.data.payloads[0].id_product,
      product_name: this.props.data.payloads[0].product_name,
      quantity: this.state.quantity,
      price: this.props.data.payloads[0].price
    }
    // console.log(JSON.parse(unescape(this.props.cookie)))
    let products = !!this.props.cookie ? [...JSON.parse(unescape(this.props.cookie)), product] : [product]
    setCookie('cart', products)
    this.props.addToCart(product)

    Router.push("/cart")
  }

  onChange(value) {
    this.setState({ quantity: value })
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <GLayout title={this.props.data.payloads[0].product_name} description={this.props.data.payloads[0].description}>
        <h1>{this.props.data.payloads[0].product_name}</h1>
        <Carousel>
          {this.listImage()}
        </Carousel>
        <Row style={{ padding: 20 }}>
          <Col xl={12}>
            <div style={{ fontSize: 18, color: '#1671cc', lineHeight: 2 }}>Rp {this.props.data.payloads[0].price}</div>
          </Col>
          <Col xl={12}>
            <Button style={{ float: 'right' }} type="primary" onClick={this.addToCart}>Keranjang</Button>
            <InputNumber style={{ float: 'right', marginRight: 5 }} min={1} defaultValue={this.state.quantity} onChange={this.onChange} />
          </Col>
        </Row>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Description" key="1">
            <p>{this.props.data.payloads[0].description}</p>
          </Panel>
        </Collapse>
      </GLayout>
    )
  }
}

export default connect(({ cart }) => { return { cart } }, { addToCart })(Product)