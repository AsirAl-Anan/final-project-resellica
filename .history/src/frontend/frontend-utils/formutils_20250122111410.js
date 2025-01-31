// src/utils/formUtils.js

// Function to handle input changes
export const handleInputChange = (e, formData, setFormData) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
  // Function to validate the form
  export const validateForm = (formData, setError) => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.username
    ) {
      setError("Please fill in all fields");
      return false;
    }
  
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Invalid email address");
      return false;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
  
    return true;
  };
  
  // Function to validate the business form
  export const validateBusinessForm = (formData, setError) => {
    if (
      !formData.businessName ||
      !formData.businessEmail ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.country
    ) {
      setError("Please fill in all required fields");
      return false;
    }
  
    if (
      !formData.businessEmail.includes("@") ||
      !formData.businessEmail.includes(".")
    ) {
      setError("Invalid email address");
      return false;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
  
    return true;
  };