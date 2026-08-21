import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/public/Home';
import { ProductsPage } from './pages/public/Products';
import { ProductDetailPage } from './pages/public/ProductDetail';
import { AccessoriesPage } from './pages/public/Accessories';
import { PromoPage } from './pages/public/Promo';
import { TradeInPage } from './pages/public/TradeIn';
import { BlogPage } from './pages/public/Blog';
import { BlogDetailPage } from './pages/public/BlogDetail';
import { AboutUsPage } from './pages/public/AboutUs';
import { ContactUsPage } from './pages/public/ContactUs';
import { CartPage } from './pages/public/Cart';
import { CheckoutPage } from './pages/public/Checkout';
import { OrderDetailPage } from './pages/public/OrderDetail';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLogin';
import { AdminDashboardPage } from './pages/admin/AdminDashboard';
import { AdminProductsPage } from './pages/admin/AdminProducts';
import { AdminProductFormPage } from './pages/admin/AdminProductForm';
import { AdminCategoriesPage } from './pages/admin/AdminCategories';
import { AdminBrandsPage } from './pages/admin/AdminBrands';
import { AdminOrdersPage } from './pages/admin/AdminOrders';
import { AdminPromosPage } from './pages/admin/AdminPromos';
import { AdminTradeInPage } from './pages/admin/AdminTradeIn';
import { AdminContentPage } from './pages/admin/AdminContent';
import { AdminBlogPage } from './pages/admin/AdminBlog';
import { AdminSeoPage } from './pages/admin/AdminSeo';
import { AdminMediaPage } from './pages/admin/AdminMedia';
import { AdminUsersPage } from './pages/admin/AdminUsers';
import { AdminSettingsPage } from './pages/admin/AdminSettings';
import { AdminActivityLogPage } from './pages/admin/AdminActivityLog';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produk', element: <ProductsPage /> },
      { path: 'produk/:slug', element: <ProductDetailPage /> },
      { path: 'aksesoris', element: <AccessoriesPage /> },
      { path: 'promo', element: <PromoPage /> },
      { path: 'trade-in', element: <TradeInPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:slug', element: <BlogDetailPage /> },
      { path: 'tentang-kami', element: <AboutUsPage /> },
      { path: 'hubungi-kami', element: <ContactUsPage /> },
      { path: 'keranjang', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'pesanan/:id', element: <OrderDetailPage /> },
    ],
  },
  // Admin Login (Standalone)
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  // Admin Routes (Protected)
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'products', element: <ProtectedRoute requiredPermission="product.read"><AdminProductsPage /></ProtectedRoute> },
      { path: 'products/new', element: <ProtectedRoute requiredPermission="product.create"><AdminProductFormPage /></ProtectedRoute> },
      { path: 'products/:id/edit', element: <ProtectedRoute requiredPermission="product.update"><AdminProductFormPage /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute requiredPermission="product.read"><AdminCategoriesPage /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute requiredPermission="product.read"><AdminBrandsPage /></ProtectedRoute> },
      { path: 'orders', element: <ProtectedRoute requiredPermission="order.read"><AdminOrdersPage /></ProtectedRoute> },
      { path: 'promos', element: <ProtectedRoute requiredPermission="product.read"><AdminPromosPage /></ProtectedRoute> },
      { path: 'trade-in', element: <ProtectedRoute requiredPermission="order.read"><AdminTradeInPage /></ProtectedRoute> },
      { path: 'content', element: <ProtectedRoute requiredPermission="content.read"><AdminContentPage /></ProtectedRoute> },
      { path: 'blog', element: <ProtectedRoute requiredPermission="content.read"><AdminBlogPage /></ProtectedRoute> },
      { path: 'seo', element: <ProtectedRoute requiredPermission="seo.read"><AdminSeoPage /></ProtectedRoute> },
      { path: 'media', element: <ProtectedRoute requiredPermission="content.read"><AdminMediaPage /></ProtectedRoute> },
      { path: 'users', element: <ProtectedRoute requiredPermission="user.manage"><AdminUsersPage /></ProtectedRoute> },
      { path: 'settings', element: <ProtectedRoute requiredPermission="settings.manage"><AdminSettingsPage /></ProtectedRoute> },
      { path: 'activity-log', element: <ProtectedRoute requiredPermission="user.manage"><AdminActivityLogPage /></ProtectedRoute> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
