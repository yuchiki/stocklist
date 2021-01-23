import React from 'react';
import './App.css';

const all_categories = ["Sporting Goods", "Electronics"] as const;

type Category = (typeof all_categories)[number];

type Product = {
  category: Category,
  price: string,
  stocked: boolean,
  name: string
};

const products: Product[] = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$09.99",
    stocked: true,
    name: "iPad Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
  },
]


const ProductRow: React.FC<{ product: Product }> = (props) =>
  <li>
    <div>
      {
        props.product.stocked ?
          <span className="stocked">{props.product.name}</span> :
          <span className="unstocked">{props.product.name}</span>
      }
      {<span className="price">{props.product.price}</span>}
    </div>
  </li>

const ProductCategoryRow: React.FC<{ category: Category }> = (props) =>
  <div>{props.category}</div>

const ProductTable: React.FC<{ products: Product[], isOnlyStocked: boolean, query: string }> = (props) =>
  <div>{
    all_categories.map(category =>
      <div>
        <ProductCategoryRow category={category} />
        <ul>
          {
            products
              .filter(p => p.category === category)
              .filter(p => !props.isOnlyStocked || p.stocked)
              .filter(p => props.query === "" || p.name.match(props.query))
              .map(p => <ProductRow product={p} />)}
        </ul>
      </div>
    )
  }</div>;

const SearchBar: React.FC<{
  onIsOnlyStockedChange: React.ChangeEventHandler<HTMLInputElement>,
  onQueryChange: React.ChangeEventHandler<HTMLInputElement>,
}> = (props) =>
    <div>
      <p>
        <input type="search" placeholder="商品を検索" onChange={props.onQueryChange} />
      </p>
      <p>
        <input type="checkbox" onChange={props.onIsOnlyStockedChange} />
      在庫のある商品のみを表示する
    </p>
    </div >;


class FilterableProductTable extends React.Component<{ products: Product[] }, { isOnlyStocked: boolean, query: string }> {
  constructor(props: { products: Product[] }) {
    super(props);

    this.state = {
      isOnlyStocked: false,
      query: ""
    }
  }

  onIsOnlyStockedChange: React.ChangeEventHandler<HTMLInputElement> = (e) => this.setState({ isOnlyStocked: e.target.checked })
  onQueryChange: React.ChangeEventHandler<HTMLInputElement> = (e) => this.setState({ query: e.target.value })

  render = () =>
    <div className="filterable-product-table">
      <SearchBar
        onIsOnlyStockedChange={this.onIsOnlyStockedChange}
        onQueryChange={this.onQueryChange}
      />
      <ProductTable products={this.props.products} isOnlyStocked={this.state.isOnlyStocked} query={this.state.query} />
    </div>;
}

const App = (_: any) => <FilterableProductTable products={products} />;

export default App;
