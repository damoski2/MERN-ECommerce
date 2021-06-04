import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Card } from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import { CheckBox } from './CheckBox'
import { prices } from './fixedPrices'
import { RadioBox } from './RadioBox'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false)
  const [limit, setLimit] = useState(6)
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([])

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    });
  };

  const loadFilteredResults = (newFilters)=>{
    //console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then(data=>{
      if(data.error){
        setError(data.error);
      }else{
        setFilteredResults(data.data)
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMore = ()=>{
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data=>{
      if(data.error){
        setError(data.error);
      }else{
        setFilteredResults([...filteredResults,...data.data])
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMoreBtn = ()=>{
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">LoadMore</button>
      )
    )
  }

  useEffect(() => {
    init();
    loadFilteredResults(skip,limit, myFilters.filters)
  }, []);

  const handleFilters = (filters, filterBy)=>{
        //console.log("SHOP",filters, filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters);
  }

  const handlePrice = value=>{
      const data = prices
      let array = []
      for(let key in data){
          if(data[key]._id === parseInt(value)){
             return array = data[key].array
          }
      }
      return array;
  }


  return (
    <Layout
      title="Shop page"
      description="Search and find books of your choice"
    >
      <div className="row">
        <div className="col-4">
            <h4>Filter by categories</h4>
            <ul>
                <CheckBox handleFilters={filters=>handleFilters(filters,'category')} categories={categories} />
            </ul>

            <h4>Filter by Price</h4>
            <div>
                <RadioBox handleFilters={filters=>handleFilters(filters,'price')} prices={prices} />
            </div>
        </div>
        <div className="col-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
              {filteredResults.map((product,i)=>(
                  <Card key={i} product={product} />
              ))}
            </div>
            <hr />
            {loadMoreBtn()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
