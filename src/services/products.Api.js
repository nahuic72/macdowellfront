import axios from "axios";

class ProductsManager {
  static getAllProducts(setProducts) {
    const getProducts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/all-products`
      );
      setProducts(response.data);
    };
    getProducts();
    return setProducts;
  }

  static getSingleProduct (setProduct, id){
    const getProduct = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data);
    }
    getProduct();
    return setProduct
  }
}

export default ProductsManager;
