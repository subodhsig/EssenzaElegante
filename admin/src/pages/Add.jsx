import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-6'>
      <form
        onSubmit={onSubmitHandler}
        className='bg-white shadow-md rounded-lg p-6 w-full max-w-5xl'
      >
        <h1 className='text-2xl text-center prata-regular mb-8'>Add Product</h1>

        {/* Upload Images */}
        <div className='mb-2'>
          <p className='mb-4 text-gray-700'>Upload Images</p>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {/* Image 1 */}
            <label htmlFor='image1'>
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt='Upload'
                className='h-[80%]'
              />
              <input
                onChange={(e) => setImage1(e.target.files[0])}
                type='file'
                id='image1'
                hidden
              />
            </label>
            {/* Image 2 */}
            <label htmlFor='image2'>
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt='Upload'
                className='h-[80%]'
              />
              <input
                onChange={(e) => setImage2(e.target.files[0])}
                type='file'
                id='image2'
                hidden
              />
            </label>
            {/* Image 3 */}
            <label htmlFor='image3'>
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt='Upload'
                className='h-[80%]'
              />
              <input
                onChange={(e) => setImage3(e.target.files[0])}
                type='file'
                id='image3'
                hidden
              />
            </label>
            {/* Image 4 */}
            <label htmlFor='image4'>
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt='Upload'
                className='h-[80%]'
              />
              <input
                onChange={(e) => setImage4(e.target.files[0])}
                type='file'
                id='image4'
                hidden
              />
            </label>
          </div>
        </div>

        {/* Product Details */}
        <div className='grid gap-6 mb-6'>
          <div>
            <p className='mb-2 text-gray-700'>Product Name</p>
            <input
              type='text'
              placeholder='Type here'
              className='w-full px-4 py-2 border rounded-lg'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <p className='mb-2 text-gray-700'>Product Description</p>
            <textarea
              placeholder='Write description here'
              className='w-full px-4 py-2 border rounded-lg'
              rows='3'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        {/* Category, Sub-category, and Price */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <div>
            <p className='mb-2 text-gray-700'>Category</p>
            <select
              className='w-full px-4 py-2 border rounded-lg'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Select Category</option>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
            </select>
          </div>

          <div>
            <p className='mb-2 text-gray-700'>Sub-category</p>
            <select
              className='w-full px-4 py-2 border rounded-lg'
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value=''>Select Sub Category</option>
              <option value='Floral'>Floral</option>
              <option value='Oud'>Oud</option>
              <option value='Oriental'>Oriental</option>
              <option value='Aquatic'>Aquatic</option>
              <option value='Woody'>Woody</option>
              <option value='Amber'>Amber</option>
              <option value='Leather'>Leather</option>
              <option value='Citrus'>Citrus</option>
              <option value='Spicy'>Spicy</option>
              <option value='Musk'>Musk</option>
              <option value='Aromatic'>Aromatic</option>
              <option value='Fruity'>Fruity</option>
              <option value='Fresh'>Fresh</option>
              <option value='Vanilla'>Vanilla</option>
            </select>
          </div>

          <div>
            <p className='mb-2 text-gray-700'>Price</p>
            <input
              type='number'
              placeholder='25'
              className='w-full px-4 py-2 border rounded-lg'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <p className='mb-4 text-gray-700'>Available Sizes</p>
          <div className='flex gap-4 flex-wrap'>
            {["50ml", "100ml"].map((size) => (
              <label
                key={size}
                className='px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100 flex items-center gap-2'
              >
                <input
                  type='checkbox'
                  className='hidden peer'
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSizes([...sizes, size]);
                    } else {
                      setSizes(sizes.filter((s) => s !== size));
                    }
                  }}
                />
                <span className='peer-checked:bg-gray-800 peer-checked:text-white peer-checked:border-gray-800 transition px-4 py-2 rounded-lg'>
                  {size}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Add to Bestseller Checkbox */}
        <div className='mb-8'>
          <label className='flex items-center gap-2 text-gray-700'>
            <input
              type='checkbox'
              className='w-5 h-5 text-gray-800 border-gray-500 rounded'
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
            />
            Add to Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition'
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
