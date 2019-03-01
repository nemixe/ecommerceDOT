import { ADDTOCART, ADDTOCARTONLOAD } from '../actions'

export default (state = [], action) => {
  switch (action.type) {
    case ADDTOCARTONLOAD:
      return [...action.payload]
      break;
    case ADDTOCART:
      return [...state, action.payload]
      break;

    default:
      return state
      break;
  }
}