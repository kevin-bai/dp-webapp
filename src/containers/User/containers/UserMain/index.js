import React, { Component } from "react";
import { bindActionCreators } from "redux";
import OrderItem from "../../components/OrderItem"
import Confirm from '../../../../components/Confirm'
import "./style.css"
import { connect } from "react-redux";
import {
  actions as userActions,
  getCurrentTab,
  getDeletingOrderId,
  getCurrentOrder,
} from "../../../../redux/modules/user"


const tabTitles = ["全部订单", "待付款", "可使用", "退款/售后"];

class UserMain extends Component {
  render() {
    const { currentTab,data ,deletingOrderId} = this.props;
    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
                <span
                  className={
                    currentTab === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {data && data.length > 0
            ? this.renderOrderList(data)
            : this.renderEmpty()}
        </div>
        {deletingOrderId ? this.renderConfirmDialog() : null}
      </div>
    );
  }

  renderOrderList = data => {
    const {currentOrder} =this.props
    return data.map(item => {
      return (
        <OrderItem
          key={item.id}
          data={item}
          isCommenting={currentOrder.isCommenting && currentOrder.id ===item.id}
          comment={currentOrder.comment}
          stars={currentOrder.stars}
          onCommentChange={this.handleCommentChange}
          onStarsChange={this.handleStarsChange}
          onCommenting={this.handleComment.bind(this, item.id)}
          onDelete={this.handleDelete.bind(this, item.id)}/>
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon"/>
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    )
  }

  handleStarsChange = star =>{
    this.props.userActions.setCurrentStar(star)
  }

  handleCommentChange = value =>{
    this.props.userActions.setComment(value)
  }

  // 删除对话框
  renderConfirmDialog = ()=> {
    const {
      userActions: { hideDeleteDialog, removeOrder }
    } = this.props;
    return (
      <Confirm
        content="确定删除该订单吗？"
        cancelText="取消"
        confirmText="确定"
        onCancel={hideDeleteDialog}
        onConfirm={removeOrder}
      />
    );
  }

  handleClickTab = (index) => {
    this.props.userActions.setCurrentTab(index)
  }

  handleDelete = itemId =>{
    this.props.userActions.showDeleteDialog(itemId)
  }

  handleComment = orderId =>{
    this.props.userActions.commentingOrder(orderId)
  }


}

const mapStateToProps = (state, props) =>{
  return {
    currentTab: getCurrentTab(state),
    deletingOrderId: getDeletingOrderId(state),
    currentOrder: getCurrentOrder(state)
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps )(UserMain);
