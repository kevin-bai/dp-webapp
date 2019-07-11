import React, { Component } from 'react';
import Detail from './components/Detail'
import ProductOverview from './components/ProductOverview'
import BuyBtn from './components/BuyBtn'
import ShopInfo from './components/ShopInfo'
import Remark from './components/Remark'
import Header from  '../../components/Header'

class ProductDetail extends Component {
  render() {
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack} grey></Header>
        <ProductOverview></ProductOverview>
        <ShopInfo></ShopInfo>
        <Detail></Detail>
        <Remark></Remark>
        <BuyBtn></BuyBtn>
      </div>
    );
  }

  handleBack =()=>{

  }
}

export default ProductDetail;
