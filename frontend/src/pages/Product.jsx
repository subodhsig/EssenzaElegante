import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("50ml");

  const fetchProductData = async () => {
    if (!products) return;

    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    } else {
      console.log("Product not found");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-6 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-10 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => {
                  setImage(item);
                }}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=''
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='' />
          </div>
        </div>

        {/* product information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className='w-5 ' />
            <img src={assets.star_icon} alt='' className='w-5 ' />
            <img src={assets.star_icon} alt='' className='w-5 ' />
            <img src={assets.star_icon} alt='' className='w-5' />
            <img src={assets.dull_star_icon} alt='' className='w-5' />

            <p className='pl-2'>(22)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>

          <div className=' flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-red-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              addToCart(productData._id, size);
            }}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-700 mt-5 flex flex-col gap-1'>
            <p className='font-medium'>Handmade with care</p>
            <p>Advance payment required for custom orders.</p>
            <p>Easy return and refund policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(22)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus aut
            odio facilis, corrupti, numquam officia nostrum facere maxime sit,
            quas ducimus. Libero, illum esse tenetur voluptas vitae sed! Ex,
            nihil.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            nesciunt sunt quaerat? Alias cupiditate atque, laudantium sequi
            neque, obcaecati nobis et iusto corrupti hic aspernatur soluta
            beatae, quae esse veniam.
          </p>
        </div>
      </div>

      {/* display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
