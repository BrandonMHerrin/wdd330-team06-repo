import { getLocalStorage, setLocalStorage, displayDiscount } from "./utils.mjs";

export default class ProductDetail {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
  }
  
  addProductToCart(product) {
  let customerCart = getLocalStorage("so-cart");
  if (customerCart == null) {
    customerCart = [];
    customerCart.push(product);
  } else {
    customerCart.push(product);
  }
  setLocalStorage("so-cart", customerCart);
}
  renderProductDetails() {
    return `<h3>${this.product.Brand.Name}</h3>

        <h2 class="divider">${this.product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />

        ${displayDiscount(this.product)}

        <p class="product__color">${this.product.Colors[0].ColorName}</p>

        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
      `;

    
  }
}
