import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Camera, X, Tag, DollarSign, Plus, ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import api from '../../../server/utils/axios.js';
import { Editor } from '@tinymce/tinymce-react';
import ProductOverview from './AdminComponents/Ui/ProductOverview.jsx';
import { ClipLoader } from 'react-spinners';
const ProductForm = () => {
  const { user } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [tags, setTags] = useState(['watches', 'sports', 'clothes', 'bottles']);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    subCategory: '',
    publishStatus: '',
    originalPrice: '',
    sellingPrice: '',
    buyingTime: '',
    currency:""
  });

  useEffect(() => {
    fetchCategories();
  }, []);
 
  const fetchCategories = async () => {
    try {
      const response = await api.get('/users/api/v1/get-categories', { email: user?.email });
      console.log(response)
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
 
 
  const handleCategoryChange = (e) => {
    const category = categories.find(cat => cat._id === e.target.value);
    setSelectedCategory(e.target.value);
    setSubCategories(category ? category.subCategories : []);
    setProductData({
      ...productData,
      category: e.target.value,
      subCategory: ''
    });
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setGalleryImages([...galleryImages, ...newImages]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const formDataToSubmit = new FormData();
      
      // Append all product data
      Object.keys(productData).forEach(key => {
        formDataToSubmit.append(key, productData[key]);
      });

      // Append title and description
      formDataToSubmit.append('title', title);
      formDataToSubmit.append('description', description);

      // Append main image if exists
      if (mainImageFile) {
        formDataToSubmit.append('mainImage', mainImageFile);
      }

      // Append gallery images
      galleryImages.forEach((image, index) => {
        formDataToSubmit.append('galleryImages', image.file);
      });

      const response = await api.post('/sellers/api/v1/add-product', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     if(response.status === 200){
        setSubmitting(false);
         //include  navigation to the product page
     } 
      
    } catch (error) {
      console.error('Error creating product:', error);
      // Add error handling here
    }
  };
// In ProductForm.jsx or wherever these handlers are defined
const allImages = [
  { uri: productData.mainImage },
  ...galleryImages
].filter(img => img.uri);

const handlePreviousImage = () => {
  setCurrentImageIndex((prev) => 
    prev === 0 ? allImages.length - 1 : prev - 1
  );
};

const handleNextImage = () => {
  setCurrentImageIndex((prev) => 
    prev === allImages.length - 1 ? 0 : prev + 1
  );
};

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  const steps = [
    { title: 'Add Product Details', subtitle: 'Add Product name & details', icon: Camera },
    { title: 'Product gallery', subtitle: 'thumbnail & Add Product...', icon: Camera },
    { title: 'Product Categories', subtitle: 'Add Product category, Status...', icon: Tag },
    { title: 'Selling prices', subtitle: 'Add Product basic price &...', icon: DollarSign },
    { title: 'Overview', subtitle: 'Add Meta details & Inventory...', icon: Settings }
  ];
 console.log("titile",title);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <div className="text-sm text-gray-500">
            <span>ECommerce</span> / <span>Add Product</span>
          </div>
        </div>
      </div>
  
      {/* Main Form Container */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Product Form</h2>
        
        {/* Steps Navigation */}
        <div className="flex mb-8">
          <div className="w-64 border-r pr-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-4 cursor-pointer rounded-lg mb-2 ${
                  activeStep === index ? 'bg-teal-50 text-teal-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index ? 'bg-teal-600 text-white' : 'bg-gray-100'
                }`}>
                  <step.icon size={20} />
                </div>
                <div className="ml-3">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-gray-500">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Form Content */}
          <div className="flex-1 pl-6">
            {/* Step 1: Product Details */}
            {activeStep === 0 && (
              <div>
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">Title</label>
                  <Editor
                    apiKey="tzni895l1i2u8ne8iqpd9irend1ci02o1vqwmn208p1l7y0h"
                    value={title}
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: ['lists', 'link', 'paste', 'fontfamily', 'fontsizetype'],
                      toolbar: 'undo redo | fontfamily fontsize | bold italic | alignleft aligncenter alignright',
                      font_family_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Helvetica=helvetica; Times New Roman=times new roman,times',
                      fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt'
                    }}
                    onEditorChange={(content) => {
                      // Strip HTML tags if you want just plain text for the title
                      const tempDiv = document.createElement('div');
                      tempDiv.innerHTML = content;
                      const plainText = tempDiv.textContent || tempDiv.innerText;
                      setTitle(plainText);
                    }}
                  />
                </div>
  
                <div className="mb-6">
                  <label className="block text-lg font-medium mb-2">Description</label>
                  <Editor
                    apiKey="tzni895l1i2u8ne8iqpd9irend1ci02o1vqwmn208p1l7y0h"
                    value={description}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: ['lists', 'link', 'image', 'paste', 'fontfamily', 'fontsizetype'],
                      toolbar: 'undo redo | fontfamily fontsize | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | removeformat',
                      font_family_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Helvetica=helvetica; Times New Roman=times new roman,times',
                      fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt'
                    }}
                    onEditorChange={(content) => setDescription(content)}
                  />
                </div>
              </div>
            )}
  
            {/* Step 2: Product Images */}
            {activeStep === 1 && (
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    {mainImage ? (
                      <div className="relative inline-block">
                        <img src={mainImage} alt="Main product" className="max-w-xs rounded" />
                        <button
                          onClick={() => {
                            setMainImage(null);
                            setMainImageFile(null);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera size={48} className="text-gray-400 mb-2" />
                        <p className="text-gray-600">
                          Drag your image here, or{' '}
                          <label className="text-blue-500 cursor-pointer">
                            browser
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleMainImageUpload}
                            />
                          </label>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                      </div>
                    )}
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-2">Product Gallery</label>
                  <div className="border-2 border-dashed rounded-lg p-8">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      {galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img src={image.url} alt={`Gallery ${index}`} className="rounded" />
                          <button
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Camera size={48} className="text-gray-400 mb-2" />
                          <p className="text-gray-600">Add Product Gallery Images</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept="image/*"
                          onChange={handleGalleryImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
  
            {/* Step 3: Categories */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={productData.category}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-2">Sub Category</label>
                  <select
                    value={productData.subCategory}
                    onChange={(e) => setProductData({
                      ...productData,
                      subCategory: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                    disabled={!selectedCategory}
                  >
                    <option value="">Select Sub Category</option>
                    {subCategories.map((subCategory, index) => (
                      <option key={index} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
  
                <div>
                  <label className="block text-sm font-medium mb-2">Publish Status</label>
                  <select
                    value={productData.publishStatus}
                    onChange={(e) => setProductData({
                      ...productData,
                      publishStatus: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="Publish">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>
            )}
  
            {/* Step 4: Pricing */}
            {activeStep === 3 && (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium mb-2">Original Price</label>
      <input
        type="number"
        value={productData.originalPrice}
        onChange={(e) => setProductData({ ...productData, originalPrice: e.target.value })}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter original price"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Selling Price</label>
      <input
        type="number"
        value={productData.sellingPrice}
        onChange={(e) => setProductData({ ...productData, sellingPrice: e.target.value })}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter selling price"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Currency</label>
      <select
        value={productData.currency}
        onChange={(e) => setProductData({ ...productData, currency: e.target.value })}
        className="w-full p-2 border rounded-lg"
      >
        <option value="">Select currency</option>
        <option value="USD">USD - US Dollar</option>
        <option value="EUR">EUR - Euro</option>
        <option value="INR">INR - Indian Rupee</option>
        <option value="BDT">BDT - Bangladeshi Taka</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-2">Buying Time</label>
      <input
        type="date"
        value={productData.buyingTime}
        onChange={(e) => setProductData({ ...productData, buyingTime: e.target.value })}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  </div>
)}
  
            {/* Step 5: Overview */}
            {activeStep === 4 && (
              <ProductOverview
                productData={{
                  ...productData,
                  mainImage: mainImage,
                  description: description,
                  title: title
                }}
                title={title}
                description={description}
                categories={categories}
                galleryImages={galleryImages}
                currentImageIndex={currentImageIndex}
                handlePreviousImage={handlePreviousImage}
                handleNextImage={handleNextImage}
                handleDotClick={handleDotClick}
              />
            )}
  
            {/* Navigation Buttons */}
            <div className="flex justify-end mt-6 pt-6 border-t">
              {activeStep > 0 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="flex items-center px-4 py-2 border rounded-lg mr-2"
                >
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </button>
              )}
              {activeStep === 4 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg"
                >
                {  submitting ? <ClipLoader color="#fff" size={20} /> : "Submit"}
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg"
                >
                  Next <ChevronRight size={16} className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;