import React, { useState } from "react";

const AddCategory = () => {
  const [emoji, setEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [subCategoryArray, setSubCategoryArray] = useState([]);

  const handleSpacePress = (e) => {
    if (e.key === " " && currentSubCategory.trim() !== "") {
      // Add the current subcategory to the array
      setSubCategoryArray([...subCategoryArray, currentSubCategory.trim()]);
      setCurrentSubCategory(""); // Clear the input
    }
  };

  const handleRemoveSubCategory = (indexToRemove) => {
    setSubCategoryArray(subCategoryArray.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSubCategory.trim() !== "") {
      // Add the remaining subcategory if any
      setSubCategoryArray([...subCategoryArray, currentSubCategory.trim()]);
      setCurrentSubCategory("");
    }
    console.log({
      emoji,
      categoryName,
      subCategories: subCategoryArray,
    });
    alert("Category added successfully!");
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Category</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Emoji Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Emoji</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="😀"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
        </div>

        {/* Category Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Category Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {/* Subcategories Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Subcategories</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Type a subcategory and press space"
            value={currentSubCategory}
            onChange={(e) => setCurrentSubCategory(e.target.value)}
            onKeyDown={handleSpacePress} // Detect space bar press
          />
        </div>

        {/* Display Subcategories Dynamically */}
        {subCategoryArray.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Subcategories:</h3>
            <div className="space-y-2">
              {subCategoryArray.map((sub, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white shadow rounded-lg px-4 py-2"
                >
                  <span className="text-gray-600">{sub}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubCategory(index)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
