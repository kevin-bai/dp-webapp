export default {
  getProductList: (rowIndex, pageSize) =>
    `/mock/products/likes.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
  getProductDetail: (id) => {
    return `/mock/product_detail/${id}.json`
  }
}
