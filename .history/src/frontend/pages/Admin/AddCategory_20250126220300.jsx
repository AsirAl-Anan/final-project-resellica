import React, { useState } from "react";

const AddCategory = () => {
  const [emoji, setEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [currentInput, setCurrentInput] = useState(""); // For managing the full input, including subcategories

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Check if a space is added and add a new subcategory
    if (value.endsWith(" ")) {
      const trimmedValue = value.trim(); // Remove the trailing space
      const parts = trimmedValue.split(",");
      const newSubcategory = parts[parts.length - 1]?.trim();

      if (newSubcategory) {
        setSubCategoryArray([...subCategoryArray, newSubcategory]);
        setCurrentInput(subCategoryArray.concat(newSubcategory).join(", ") + ", ");
      }
    } else {
      setCurrentInput(value); // Update input as the admin types
    }
  };

  const handleRemoveSubCategory = (indexToRemove) => {
    const updatedArray = subCategoryArray.filter((_, index) => index !== indexToRemove);
    setSubCategoryArray(updatedArray);
    setCurrentInput(updatedArray.join(", ") + (updatedArray.length > 0 ? ", " : ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSubcategories = currentInput
      .split(",")
      .map((sub) => sub.trim())
      .filter((sub) => sub !== ""); // Ensure no empty subcategories
    console.log({
      emoji,
      categoryName,
      subCategories: finalSubcategories,
    });
    alert("Category added successfully!");
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Category</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Emoji Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Category Icon</label>
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
            value={currentInput}
            onChange={handleInputChange} // Dynamically update input
          />
        </div>

        {/* Display Subcategories as Chips */}
        {subCategoryArray.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Subcategories:</h3>
            <div className="flex flex-wrap gap-2">
              {subCategoryArray.map((sub, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-lg shadow"
                >
                  <span>{sub}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubCategory(index)}
                    className="ml-2 text-red-500 font-bold hover:text-red-700"
                  >
                    ×
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
