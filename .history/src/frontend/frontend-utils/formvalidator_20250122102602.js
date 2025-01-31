const validateForm = (firstName,lastName,password) =>{
    if (!firstName || !lastName || !email || !password || !confirmPassword || !username) {
          setError('Please fill in all fields');
          return false;
        }
    
        if (!email.includes('@') || !email.includes('.')) {
          setError('Invalid email address');
          return false;
        }
    
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
    
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
        
        return true;
}