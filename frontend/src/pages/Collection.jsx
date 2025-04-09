import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // On initial render, get filter values from localStorage
  useEffect(() => {
    const savedCategory = localStorage.getItem("category");
    const savedSubCategory = localStorage.getItem("subCategory");
    const savedSortType = localStorage.getItem("sortType");

    if (savedCategory) setCategory(JSON.parse(savedCategory));
    if (savedSubCategory) setSubCategory(JSON.parse(savedSubCategory));
    if (savedSortType) setSortType(savedSortType);
  }, []);

  // Save filter values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
    localStorage.setItem("subCategory", JSON.stringify(subCategory));
    localStorage.setItem("sortType", sortType);
  }, [category, subCategory, sortType]);

  // Ensure products are available before applying filters
  useEffect(() => {
    if (products.length > 0) {
      applyFilterAndSort();
    }
  }, [category, subCategory, sortType, search, showSearch, products]);

  const toggleCategory = (e) => {
    const newCategory = category.includes(e.target.value)
      ? category.filter((item) => item !== e.target.value)
      : [...category, e.target.value];
    setCategory(newCategory);
  };

  const toggleSubCategory = (e) => {
    const newSubCategory = subCategory.includes(e.target.value)
      ? subCategory.filter((item) => item !== e.target.value)
      : [...subCategory, e.target.value];
    setSubCategory(newSubCategory);
  };

  const applyFilterAndSort = () => {
    let productsCopy = [...products];

    // Apply search filter
    if (showSearch && search.trim() !== "") {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  };

  // Function to reset all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
    localStorage.removeItem("category");
    localStorage.removeItem("subCategory");
    localStorage.removeItem("sortType");
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-8 border-t mt-8'>
      {/* Filters Options */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS{" "}
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-180" : ""}`}
            src={assets.dropdown_icon}
            alt=''
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Men", "Women"].map((cat) => (
              <p className='flex gap-2' key={cat}>
                <input
                  className='w-3'
                  type='checkbox'
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                  value={cat}
                />
                {cat}
              </p>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              "Floral",
              "Oud",
              "Oriental",
              "Aquatic",
              "Woody",
              "Amber",
              "Leather",
              "Citurs",
              "Spicy",
              "Musk",
              "Aromatic",
              "Fruity",
              "Fresh",
              "Vanilla",
            ].map((sub) => (
              <p className='flex gap-2' key={sub}>
                <input
                  className='w-3'
                  type='checkbox'
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                  value={sub}
                />
                {sub.toUpperCase()}
              </p>
            ))}
          </div>
        </div>

        <button
          onClick={clearFilters}
          className='mt-4 bg-red-400 text-white py-2 px-4 rounded'
        >
          Clear Filters
        </button>
      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2'
            value={sortType}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
