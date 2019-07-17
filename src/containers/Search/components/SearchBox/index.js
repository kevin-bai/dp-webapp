import React, { Component } from 'react';
import './style.css'

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef()
  }

  render() {
    const {inputText,relatedKeywords} = this.props

    return (
      <div className='searchBox'>
        <div className='searchBox__container'>
          <input
            ref={this.myRef}
            type="text" className='searchBox__text'
            onChange={this.handleChange}
            value={inputText}
            placeholder='请输入关键词'
          />
          <span className='searchBox__clear' onClick={this.handleClear}></span>
          <span className='searchBox__cancel' onClick={this.handleCancel}>取消</span>
        </div>
        {relatedKeywords ? this.renderSuggestList() : null}
      </div>
    );
  }

  componentDidMount() {
    this.myRef.current.focus()
  }

  handleChange = (e) => {
    this.props.handleChange(e.target.value)
  }

  handleClear = () => {
    this.props.handleClear()
  }

  handleCancel = () => {
    this.props.goBack();
  }

  handleSearchItem = (item) => {
    this.props.handleSearchItem(item)
  }

  renderSuggestList = () => {
    return (
      <ul className='searchBox__list'>
        {this.props.relatedKeywords.map((item, index) => {
          return (
            <li key={index} className="searchBox__item" onClick={this.handleSearchItem.bind(this, item)}>
              <span className="searchBox__itemKeyworkd">{item.keyword}</span>
              <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
            </li>
          )
        })}

      </ul>
    )
  }
}

export default SearchBox;
