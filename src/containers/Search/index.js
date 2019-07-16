import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SearchBox from './components/SearchBox'
import PopularSearch from './components/PopularSearch'
import SearchHistory from './components/SearchHistory'
import {
  actions as searchActions,
  getPopularKeywords,
  getInputText,
  getHistoryKeywords,
  getRelatedKeywords
} from '../../redux/modules/search'

class Search extends Component {
  render() {
    const {popularKeywords, historyKeywords, inputText,relatedKeywords} = this.props;
    console.log('search component', this.props)

    return (
      <div>
        <SearchBox
          goBack={this.goBack}
          inputText={inputText}
          handleChange={this.changeInputText}
          handleClear={this.clearInputText}
          handleSearchItem={this.searchItem}
          relatedKeywords={relatedKeywords}
        ></SearchBox>
        <PopularSearch
          data={popularKeywords}
          handleSearchItem={this.searchItem}
        ></PopularSearch>
        <SearchHistory
          data={historyKeywords}
          handleClear={this.clearHistoryKeywords}
          handleSearchItem={this.searchItem}
        ></SearchHistory>
      </div>
    );
  }

  componentDidMount() {
    this.props.searchActions.loadPopularKeywords();
    // this.props.searchActions.loadRelatedKeywords('');
  }

  goBack = () => {
    this.props.history.goBack();
  }

  changeInputText = (text) => {
    this.props.searchActions.setInputText(text);
    this.props.searchActions.loadRelatedKeywords(text)
  }

  clearInputText = () => {
    this.props.searchActions.clearInputText()
  }

  clearHistoryKeywords = ()=>{
    this.props.searchActions.clearHistoryKeywords()
  }

  searchItem = item =>{
    this.props.searchActions.setInputText(item.keyword);
    this.props.searchActions.addHistoryKeywords(item.id);
    // todo 跳转逻辑
  }

}

const mapStateToProps = (state, props) => {
  return {
    popularKeywords: getPopularKeywords(state),
    relatedKeywords: getRelatedKeywords(state),
    inputText: getInputText(state),
    historyKeywords: getHistoryKeywords(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
