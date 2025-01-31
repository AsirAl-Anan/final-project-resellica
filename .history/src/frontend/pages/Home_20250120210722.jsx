# Create main directories inside src
mkdir assets components components/common components/auth components/dashboard components/products layouts pages routes services styles

# Create files in the src directory
touch App.jsx index.js vite.config.js

# Create style files
touch styles/index.css styles/tailwind.css styles/theme.css

# Create files for reusable components
touch components/common/Navbar.jsx components/common/Footer.jsx components/common/Spinner.jsx

# Create files for authentication components
touch components/auth/Login.jsx components/auth/Register.jsx components/auth/ForgotPassword.jsx

# Create files for dashboard components
touch components/dashboard/AdminDashboard.jsx components/dashboard/BuyerDashboard.jsx components/dashboard/SellerDashboard.jsx

# Create files for product components
touch components/products/ProductCard.jsx components/products/ProductDetails.jsx components/products/ProductList.jsx

# Create files for layouts
touch layouts/MainLayout.jsx layouts/DashboardLayout.jsx

# Create files for pages
touch pages/Home.jsx pages/ErrorPage.jsx pages/ProductDetails.jsx

# Create files for routes
touch routes/Routes.jsx routes/PrivateRoute.jsx

# Create files for services
touch services/authService.js services/productService.js services/notificationService.js