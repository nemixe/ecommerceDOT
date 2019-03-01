import GLayout from '../components/_layout'
import { Card, Icon, Avatar, Col, Row, Empty } from 'antd'

import Link from 'next/link'
import { get } from '../utils/request'

const { Meta } = Card

export default class extends React.Component {
  constructor() {
    super()

    this.listProductsHandler = this.listProductsHandler.bind(this)
  }
  static async getInitialProps({ query }) {
    const res = await get(`/stores/${query.id}`)

    return {
      data: res.data
    }
  }

  listProductsHandler() {
    console.log(this.props.data.products.count)
    if (this.props.data.products.count == 0) {
      return <Empty description="No Product" />
    }
    return this.props.data.products.data.map(product => (
      <Col lg={8} md={12} key={product.id_product}>
        <Link href={`product?id=${product.id_product}`}>
          <a>
            <Card
              hoverable
              style={{ width: 240, margin: '16px auto' }}
              cover={<div style={{ width: 100 + '%', height: 300, background: 'gray' }}></div>}
            >
              <Meta
                title={product.product_name}
                description={'Rp. ' + product.price}
              />
            </Card>
          </a>
        </Link>
      </Col>
    ))
  }

  render() {
    return (
      <GLayout title="Toko" description="Toko-toko">
        <Card
          style={{ width: '100%' }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" style={{ height: 200 }} />}
          actions={[<div>{this.props.data.products.count} Products</div>, <div><Icon type="message" /> Message</div>, <div>Report<Icon type="exclamation" /></div>]}
        >
          <Meta
            avatar={<Avatar src={this.props.data.payload[0].photo_profil_store} />}
            title={this.props.data.payload[0].store_name}
          />
        </Card>
        <Card title="Product" bordered={false} style={{ width: '100%' }}>
          <Row>
            {this.listProductsHandler()}
          </Row>
        </Card>
      </GLayout>
    )
  }
}