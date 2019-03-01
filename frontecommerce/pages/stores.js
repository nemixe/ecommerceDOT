import GLayout from '../components/_layout'
import { Card, Avatar, Row, Col } from 'antd'
import Link from 'next/link'
// import { Link } from '../routes'

import { get } from '../utils/request'

const { Meta } = Card

export default class extends React.Component {
  constructor() {
    super()

    this.listStoresHandler = this.listStoresHandler.bind(this)
  }
  static async getInitialProps() {
    const res = await get('/stores')

    return {
      data: res.data
    }
  }

  listStoresHandler() {
    // console.log(this.props.data.payloads.map)
    return this.props.data.payloads.map((store) => (
      <Col lg={8} md={12} key={store.id_store}>
        <Card style={{ width: 240, margin: '16px auto' }}>
          <Link href={`store-profile?id=${store.id_store}`}>
            <a>
              <Meta
                avatar={<Avatar src={store.photo_profil_store} />}
                title={store.store_name}
              />
            </a>
          </Link>
        </Card>
      </Col>
    ))
  }

  render() {
    return (
      <GLayout title="Toko" description="Toko-toko" route="2">
        <Row>
          {this.listStoresHandler()}
        </Row>
      </GLayout>
    )
  }
}