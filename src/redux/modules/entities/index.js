import { combineReducers } from "redux";
import products from "./products";
import shops from "./shops";
import comments from "./comments";
import orders from "./orders";
import keywords from "./keywords";

// 合并领域状态
const rootReducer = combineReducers({
  products,
  shops,
  keywords,
  comments,
  orders
});

export default rootReducer;
