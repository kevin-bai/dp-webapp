import React, { Component } from "react";
import Banner from "../../components/Banner";
import SearchHeader from "./components/SearchHeader";
import ShopList from "./components/ShopList";
import KeywordBox from "./components/KeywordBox";
import {
  getCurrentKeyword,
  getSearchedRelatedShop
} from "../../redux/modules/search";
import { connect } from "react-redux";

class SearchResult extends Component {
  render() {
    const { currentKeyword, searchedShops } = this.props;

    return (
      <div>
        <SearchHeader
          onBack={this.handleBack}
          onSearch={this.handleSearch}
        ></SearchHeader>
        <KeywordBox text={currentKeyword}></KeywordBox>
        <Banner></Banner>
        <ShopList data={searchedShops}></ShopList>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push("/");
  };

  handleSearch = () => {
    this.props.history.push("/search");
  };
}

const mapStateToProps = (state, props) => {
  return {
    currentKeyword: getCurrentKeyword(state),
    searchedShops: getSearchedRelatedShop(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchResult);
