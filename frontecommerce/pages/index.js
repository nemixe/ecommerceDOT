import GLayout from '../components/_layout'
import { Card } from 'antd';
import { Row, Col } from 'antd';
import Link from 'next/link'
// import { Link } from '../routes'
const { Meta } = Card;

import { get } from '../utils/request'

export default class extends React.Component {
  constructor() {
    super()

    this.listProductsHandler = this.listProductsHandler.bind(this)
  }

  static async getInitialProps() {
    const res = await get('/products')

    return {
      data: res.data
    }
  }

  listProductsHandler() {
    return this.props.data.payloads.map(product => (
      <Col lg={8} md={12} key={product.id_product}>
        <Card
          hoverable
          style={{ width: 240, margin: '16px auto' }}
          cover={<div style={{ width: 100 + '%', height: 300, background: 'gray' }}></div>}
        >
          <Link href={`product?id=${product.id_product}`}>
            <a>
              <Meta
                title={product.product_name}
                description={'Rp. ' + product.price}
              />
            </a>
          </Link>
        </Card>
      </Col>
    ))
  }

  render() {
    return (
      <GLayout title="Beranda" description="Landing page" route="1">
        <Row>
          {this.listProductsHandler()}
        </Row>
      </GLayout>
    )
  }
}