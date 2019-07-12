import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Detail from './components/Detail'
import ProductOverview from './components/ProductOverview'
import BuyBtn from './components/BuyBtn'
import ShopInfo from './components/ShopInfo'
import Remark from './components/Remark'
import Header from '../../components/Header'
import {
  actions as detailActions,
  getProduct
} from "../../redux/modules/detail";


class ProductDetail extends Component {
  render() {
    const {product} = this.props
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack} grey></Header>
        <ProductOverview></ProductOverview>
        <ShopInfo></ShopInfo>
        <Detail data={product}></Detail>
        <Remark></Remark>
        <BuyBtn></BuyBtn>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.goBack();
  }

  componentDidMount() {
    const productId = this.props.match.params.id;
    console.log('router params', this.props.match)
    this.props.detailActions.loadProductDetail(productId)
    // 页面跳转后重新回到页面顶部
    document.getElementById('root').scrollIntoView(true)
  }

}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    product: getProduct(state, productId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detailActions: bindActionCreators(detailActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
