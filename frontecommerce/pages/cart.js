import GLayout from '../components/_layout'
import { Card, Avatar, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { postTransaction } from '../controller/transaction'

class Cart extends React.Component {
  constructor() {
    super()

    this.listProductOnCart = this.listProductOnCart.bind(this)
  }
  listProductOnCart() {
    return this.props.cart.map(product => (
      <Card style={{ width: '99%', margin: '5px 0.5%' }} key={Math.random()}>
        <Row>
          <Col style={{ float: 'left', margin: '0px 20px 0px 10px' }}>
            <Avatar size={64} icon="user" />
          </Col>
          <Col span={20} style={{ margin: 0, width: 'auto' }}>
            <h3>{product.product_name}</h3>
            <p>Rp {product.price} x {product.quantity} : <span style={{ color: 'green' }}>Rp {product.price * product.quantity}</span></p>
          </Col>
        </Row>
      </Card>
    ))
  }

  render() {
    return (
      <GLayout title="Keranjang" description="Keranjang">
        {this.listProductOnCart()}
        {() => {
          if (this.props.cart.length = 0) {
            return (
              <div>

              </div>
            )
          }
        }}
        <hr style={{ borderColor: 'gray' }} />

        <Row>
          <Col style={{ float: 'right' }}>
            <Button onClick={() => postTransaction(this.props.cart)}>Go to Transaction</Button>
          </Col>
        </Row>
      </GLayout>
    )
  }
}

export default connect(({ cart }) => { return { cart } }, {})(Cart)