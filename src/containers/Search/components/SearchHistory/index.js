import React, { Component } from 'react';
import './style.css'

class SearchHistory extends Component {
  render() {
    const {data} = this.props

    return (
      <div className="searchHistory">
        <div className="searchHistory__header">搜索记录</div>
        <ul className="searchHistory__list">
          {
            data.map((item, index) => {
              return (
                <li key={item.id}
                    onClick={this.handleSearchItem.bind(this, item)}
                    className="searchHistory__item">
                  {item.keyword}
                </li>
              )
            })
          }
        </ul>
        <div className="searchHistory__clear" onClick={this.handleClear}>清除搜索记录</div>
      </div>
    );
  }

  handleSearchItem = (item) => {
    this.props.handleSearchItem(item)
  }

  handleClear = () => {
    this.props.handleClear()
  }
}

export default SearchHistory;
