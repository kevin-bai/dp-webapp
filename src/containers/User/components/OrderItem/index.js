import React, { Component } from "react";
import "./style.css"

class OrderItem extends Component {
  render() {
    const {
      data: { title, statusText, orderPicUrl, channel, text, type },
      isCommenting
    } = this.props;
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img alt="" className="orderItem__img" src={orderPicUrl} />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {type === 1 ? <div className="orderItem__btn" onClick={this.handleCommenting}>评价</div> : null}
            <div onClick={this.handleDelete} className="orderItem__btn">删除</div>
          </div>
        </div>
        {isCommenting?  this.renderEditArea(): null}
      </div>
    );
  }

  renderEditArea = ()=>{
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.handleCommentChange}
          value={this.props.comment}
        />
        {this.renderStars()}
        <button
          className="orderItem__commentBtn"
          onClick={this.props.onSubmitComment}
        >
          提交
        </button>
        <button
          className="orderItem__commentBtn"
          onClick={this.props.onCancelComment}
        >
          取消
        </button>
      </div>
    )
  }

  renderStars = ()=>{
    const { stars } = this.props;
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = stars >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={this.props.onStarsChange.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  handleDelete = ()=>{
    this.props.onDelete()
  }

  handleCommenting = ()=>{
    this.props.onCommenting()
  }

  handleCommentChange = e=>{
    this.props.onCommentChange(e.target.value)
  }

}

export default OrderItem;
