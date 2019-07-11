import React, { Component } from 'react';
import Detail from './components/Detail'
import ProductOverview from './components/ProductOverview'

class ProductDetail extends Component {
  render() {
    return (
      <div>
        <ProductOverview></ProductOverview>
        <Detail></Detail>
      </div>
    );
  }
}

export default ProductDetail;
