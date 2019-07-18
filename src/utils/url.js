export default {
  getProductList: (rowIndex, pageSize) =>
    `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
  getProductDetail: (id) => {
    return `/mock/product_detail/${id}.json`
  },
  getShopDetail: (id) => `/mock/shops/${id}.json`,
  getKeywordsByType: type => `/mock/keywords/${type}.json`,
  getRelatedShopBykeyword: keyword => `/mock/shops/related.json?keyword=${keyword}`
}
