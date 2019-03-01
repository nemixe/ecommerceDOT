import { ADDTOCART, ADDTOCARTONLOAD } from '.'

export function addToCart(payload) {
  return {
    type: ADDTOCART,
    payload
  }
}
export function addToCartOnLoad(payload) {
  return {
    type: ADDTOCARTONLOAD,
    payload
  }
}