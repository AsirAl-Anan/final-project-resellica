import React, { useState, useEffect ,useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Camera, X, Tag, DollarSign, Plus, ChevronLeft, ChevronRight, Settings, Info } from 'lucide-react';
import api from '../../../server/utils/axios.js';
import { Editor } from '@tinymce/tinymce-react';
import ProductOverview from './AdminComponents/Ui/ProductOverview.jsx';
import ImageSlider from './AdminComponents/Ui/ImageSlider.jsx';
const ProductForm = () => {
  const {user} = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [tags, setTags] = useState(['watches', 'sports', 'clothes', 'bottles']);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    subCategory: '',
    publishStatus: 'Publish',
    originalPrice: '',
    sellingPrice: '',
    buyingTime: '',
  });


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.post('/users/api/v1/get-categories', { email: user?.email });
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Update form data handlers
  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        mainImage: file,
        mainImagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleGalleryImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file: file,
      url: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages]
    }));
  };

  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    
    // Append form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'mainImage' && key !== 'galleryImages' && key !== 'mainImagePreview') {
        formDataToSubmit.append(key, value);
      }
    });

    // Append images
    if (formData.mainImage) {
      formDataToSubmit.append('mainImage', formData.mainImage);
    }

    formData.galleryImages.forEach((image) => {
      if (image.file) {
        formDataToSubmit.append('galleryImages', image.file);
      }
    });

    try {
      const response = await api.post('/products/create', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Product created:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Image navigation handlers
  const handlePreviousImage = () => {
    const totalImages = formData.galleryImages.length + (formData.mainImagePreview ? 1 : 0);
    setCurrentImageIndex((prev) => 
      prev === 0 ? totalImages - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    const totalImages = formData.galleryImages.length + (formData.mainImagePreview ? 1 : 0);
    setCurrentImageIndex((prev) => 
      prev === totalImages - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Get all images for the slider
  const getAllImages = () => {
    const images = [];
    if (formData.mainImagePreview) {
      images.push({ url: formData.mainImagePreview });
    }
    return [...images, ...formData.galleryImages];
  };

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
          toolbar: 'undo redo | fontfamily fontsize | bold italic | \
            alignleft aligncenter alignright',
          font_family_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Helvetica=helvetica; Times New Roman=times new roman,times',
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt'
        }}
        onEditorChange={(content) => setTitle(content)}
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
          toolbar: 'undo redo | fontfamily fontsize | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist | removeformat',
          font_family_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino; Helvetica=helvetica; Times New Roman=times new roman,times',
          fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt'
        }}
        onEditorChange={(content) => setDescription(content)}
      />
    </div>
  </div>
)}

            {activeStep === 1 && (
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    {mainImage ? (
                      <div className="relative inline-block">
                        <img src={mainImage} alt="Main product" className="max-w-xs rounded" />
                        <button
                          onClick={() => setMainImage(null)}
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
                        <p className="text-sm text-gray-500 mt-1">SVG,PNG,JPG or GIF</p>
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
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Original Price</label>
                <input
                  type="number"
                  value={productData.originalPrice}
                  onChange={(e) => setProductData({
                    ...productData,
                    originalPrice: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter original price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Selling Price</label>
                <input
                  type="number"
                  value={productData.sellingPrice}
                  onChange={(e) => setProductData({
                    ...productData,
                    sellingPrice: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter selling price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Buying Time</label>
                <input
                  type="date"
                  value={productData.buyingTime}
                  onChange={(e) => setProductData({
                    ...productData,
                    buyingTime: e.target.value
                  })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          )}
{activeStep === 4 && (
        <ProductOverview
          productData={formData}
          title={formData.title}
          description={formData.description}
          categories={categories}
          galleryImages={formData.galleryImages}
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
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;