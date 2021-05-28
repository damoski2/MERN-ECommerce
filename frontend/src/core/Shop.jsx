import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Card } from "./Card";
import { getCategories } from "./apiCore";
import { CheckBox } from './CheckBox'
import { prices } from './fixedPrices'
import { RadioBox } from './RadioBox'

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false)

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleFilters = (filters, filterBy)=>{
        //console.log("SHOP",filters, filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

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
            {JSON.stringify(myFilters)}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
