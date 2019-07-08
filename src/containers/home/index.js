import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Category from './components/Category'
import Headline from './components/HeadLine'
import Discount from "./components/Discount";
import HomeHeader from  './components/HomeHeader'
import {
  actions as homeActions,
  getDiscounts
} from '../../redux/modules/home'


class Home extends Component {
  render() {
    const {discounts} = this.props
    console.log('home props',this.props)
    return (
      <div>
        <HomeHeader></HomeHeader>
        <Category></Category>
        <Headline></Headline>
        <Discount data={discounts}></Discount>
      </div>
    );
  }

  componentDidMount() {
    this.props.homeActions.loadDiscounts()
  }
}

const mapStateToProps = (state, props) => {
  return {
    discounts: getDiscounts(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
