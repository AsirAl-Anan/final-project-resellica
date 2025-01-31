import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import api from "../../../server/utils/axios.js";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [emoji, setEmoji] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryArray, setSubCategoryArray] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const emojiInputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value.endsWith(" ")) {
      const trimmedValue = value.trim();
      const parts = trimmedValue.split(",");
      const newSubcategory = parts[parts.length - 1]?.trim();

      if (newSubcategory) {
        setSubCategoryArray([...subCategoryArray, newSubcategory]);
        setCurrentInput(subCategoryArray.concat(newSubcategory).join(", ") + ", ");
      }
    } else {
      setCurrentInput(value);
    }
  };

  const handleRemoveSubCategory = (indexToRemove) => {
    const updatedArray = subCategoryArray.filter((_, index) => index !== indexToRemove);
    setSubCategoryArray(updatedArray);
    setCurrentInput(updatedArray.join(", ") + (updatedArray.length > 0 ? ", " : ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!emoji) {
      toast.error("Please select an emoji for the category");
      return;
    }

    if (!categoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    // Check if there are any subcategories
    const finalSubcategories = currentInput
      .split(",")
      .map((sub) => sub.trim())
      .filter((sub) => sub !== "");

    if (finalSubcategories.length === 0) {
      toast.error("Please add at least one subcategory");
      return;
    }

    try {
      const res = await api.post("/admins/api/v1/create-category", {
        icon: emoji,
        name: categoryName,
        subCategories: finalSubcategories,
      });

      // Clear all inputs after successful or unsuccessful response
      if (res.status === 200) {
        toast.success("Category created successfully");
        
        // Reset all state variables
        setEmoji("");
        setCategoryName("");
        setSubCategoryArray([]);
        setCurrentInput("");
        setShowEmojiPicker(false);
      } else {
        toast.error("Couldn't create category");
        
        // Reset all state variables
        setEmoji("");
        setCategoryName("");
        setSubCategoryArray([]);
        setCurrentInput("");
        setShowEmojiPicker(false);
      }
    } catch (error) {
      // Handle any network or server errors
      toast.error("An error occurred while creating the category");
      
      // Reset all state variables
      setEmoji("");
      setCategoryName("");
      setSubCategoryArray([]);
      setCurrentInput("");
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  // Rest of the component remains the same...
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Category</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Form content remains the same */}
      </form>
    </div>
  );
};

export default AddCategory;