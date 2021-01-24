import React, { useState } from 'react';
import './App.css';
import {Product, Category, allCategories, sampleProducts} from './products';

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
    allCategories.map(category =>
      <div>
        <ProductCategoryRow category={category} />
        <ul>
          {
            props.products
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


const FilterableProductTable: React.FC<{ products: Product[] }> = (props) => {
  const [isOnlyStocked, setIsOnlyStocked] = useState(false);
  const [query, setQuery] = useState("");

  const onIsOnlyStockedChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setIsOnlyStocked(e.target.checked);

  const onQueryChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setQuery(e.target.value);

  return <div className="filterable-product-table">
    <SearchBar
      onIsOnlyStockedChange={onIsOnlyStockedChange}
      onQueryChange={onQueryChange}
    />
    <ProductTable
      products={props.products}
      isOnlyStocked={isOnlyStocked}
      query={query}
    />
  </div>
}

const App = (_: any) => <FilterableProductTable products={sampleProducts} />;

export default App;
