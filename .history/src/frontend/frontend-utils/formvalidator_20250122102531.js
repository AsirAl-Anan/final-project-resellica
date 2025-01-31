const validateForm = () =>{
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.username) {
          setError('Please fill in all fields');
          return false;
        }
    
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
          setError('Invalid email address');
          return false;
        }
    
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
    
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
        
        return true;
}