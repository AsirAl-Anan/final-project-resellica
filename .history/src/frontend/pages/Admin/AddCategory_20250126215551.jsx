import React, { useState } from "react";

const AddCategory = () => {
  const [emoji, setEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [subCategoryArray, setSubCategoryArray] = useState([]);

  const handleSubCategories = () => {
    const subCatArray = subCategories.split(" ").filter((sub) => sub.trim() !== "");
    setSubCategoryArray(subCatArray);
    alert("Subcategories added: " + subCatArray.join(", "));
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Category</h2>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubCategories();
        }}
      >
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

        {/* Subcategories Text Area */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Subcategories</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter subcategories separated by spaces"
            value={subCategories}
            onChange={(e) => setSubCategories(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add Category
        </button>
      </form>

      {/* Display Subcategories */}
      {subCategoryArray.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Subcategories:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            {subCategoryArray.map((sub, index) => (
              <li key={index}>{sub}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
