import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Detail from "./components/Detail";
import ProductOverview from "./components/ProductOverview";
import BuyBtn from "./components/BuyBtn";
import ShopInfo from "./components/ShopInfo";
import Remark from "./components/Remark";
import Header from "../../components/Header";
import {
  actions as detailActions,
  getProduct,
  getRelatedShop
} from "../../redux/modules/detail";

class ProductDetail extends Component {
  render() {
    const { product, shop } = this.props;
    console.log("detail data", product);
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack} grey></Header>
        {product && <ProductOverview data={product}></ProductOverview>}
        {shop && (
          <ShopInfo data={shop} total={product.shopIds.length}></ShopInfo>
        )}
        {product && (
          <div>
            <Detail data={product}></Detail>
            <Remark data={product}></Remark>
            <BuyBtn productId={product.id}></BuyBtn>
          </div>
        )}
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    // console.log('product detail----------componentDidMount')
    const productId = this.props.match.params.id;
    // console.log('router params', this.props.match)
    this.props.detailActions.loadProductDetail(productId);
    if (this.props.product) {
      const shopId = this.props.product.nearestShop;
      this.props.detailActions.loadShopDetail(shopId);
    }
    // 页面跳转后重新回到页面顶部
    document.getElementById("root").scrollIntoView(true);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("product detail----------componentDidUpdate");
    if (!prevProps.product && this.props.product) {
      this.props.detailActions.loadShopDetail(this.props.product.nearestShop);
    }
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    product: getProduct(state, productId),
    shop: getRelatedShop(state, productId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
