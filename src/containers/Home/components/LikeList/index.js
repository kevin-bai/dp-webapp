import React, { Component } from 'react';
import LikeItem from '../LikeItem'
import Loading from '../../../../components/Loading';
import './style.css'

class LikeList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()
  }

  render() {
    const {data, pageCount,loading} = this.props
    return (
      <div ref={this.myRef} className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {data.map((item, index) => {
            return <LikeItem key={index} data={item} />;
          })}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <a onClick={this.loadMore} className="likeList__viewAll">查看更多</a>
        )}
      </div>
    );
  }

  componentDidMount() {
    // console.log('this.props --componentDidMount', this.props)
    console.log('my ref', this.myRef.current);
    console.log('document', document)

    if (this.props.pageCount < 3) {
      document.addEventListener('scroll', this.handleScroll)
    }
    this.props.fetchData()
  }

  // todo 为什么渲染多次，如何优化？
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('prevProps', prevProps)
    console.log('this.props --componentDidUpdate', this.props)
    if (this.props.pageCount > 3) {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    console.log('componentWillMount')
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    // console.log('handel scroll')
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if (scrollTop >= likeListHeight + likeListTop - screenHeight) {
      this.props.fetchData();
    }
  }

  loadMore = () => {
    this.props.fetchData()
  }
}

export default LikeList;
