import { post } from '../utils/request'
import { removeCookie } from '../utils/cookie'

export const postTransaction = async (trans) => {
  if (typeof trans === "undefined") {
    return
  }
  let total = 0

  trans.map(tran => {
    total = total + (tran.price * tran.quantity)
  })

  let transaction = {
    "total_price": total,
    "id_user": 101,
    "id_address": 133,
    "id_courier": 1,
    "payload": trans.map(tran => {
      return {
        "id_product": tran.id_product,
        "quantity": tran.quantity,
        "price_items": tran.price
      }
    })
  }

  try {
    const res = await post("/transactions", transaction)
    removeCookie('cart')
    document.location.pathname = "/"
    return res.data
  } catch (err) {
    return err.response && err.response.status === 400
      ? "Error occured while processing transaction" : "Unknown error, please try again"
  }
}