import React, { Component } from "react";
import "./style.css";

class PopularBox extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="popularSearch">
        {data.map((item, index) => {
          return (
            <span
              key={item.id}
              onClick={this.handleSearchItem.bind(this, item)}
              className="popularSearch__item"
            >
              {item.keyword}
            </span>
          );
        })}
      </div>
    );
  }

  handleSearchItem = item => {
    this.props.handleSearchItem(item);
  };
}

export default PopularBox;
