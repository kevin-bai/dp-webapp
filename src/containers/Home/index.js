import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import Category from './components/Category'
import Headline from './components/HeadLine'
import Discount from "./components/Discount";
import HomeHeader from  './components/HomeHeader';
import Activity from './components/Activity';
import LikeList from './components/LikeList'
import {
  actions as homeActions,
  getDiscounts,
  getLikes,
  getLikesPageCount,
  getLikesFetchingFlag
} from '../../redux/modules/home'


class Home extends Component {
  render() {
    const {discounts, likes, likesPageCount,likesLoading} = this.props
    // console.log('home props',this.props)
    return (
      <div>
        <HomeHeader></HomeHeader>
        <Category></Category>
        <Headline></Headline>
        <Activity></Activity>
        <Discount data={discounts}></Discount>
        <LikeList data={likes} pageCount={likesPageCount} fetchData={this.loadLikes} loading={likesLoading}></LikeList>
      </div>
    );
  }

  componentDidMount() {
    this.props.homeActions.loadDiscounts();
  }


  // 为什么不能这样？
  // loadLikes(){
  //   this.props.homeActions.loadLikes();
  // }

  loadLikes = ()=>{
    this.props.homeActions.loadLikes();
  }

}

const mapStateToProps = (state, props) => {
  return {
    discounts: getDiscounts(state),
    likes: getLikes(state),
    likesPageCount:getLikesPageCount(state),
    likesLoading: getLikesFetchingFlag(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // bindActionCreators 可以不用再传dispatch给子组件，而直接使用homeActions下面的方法进行dispatch操作
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
