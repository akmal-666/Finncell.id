import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  // Admin Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'products/new', element: <AdminProductFormPage /> },
      { path: 'products/:id/edit', element: <AdminProductFormPage /> },
      { path: 'categories', element: <AdminCategoriesPage /> },
      { path: 'brands', element: <AdminBrandsPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'promos', element: <AdminPromosPage /> },
      { path: 'trade-in', element: <AdminTradeInPage /> },
      { path: 'content', element: <AdminContentPage /> },
      { path: 'blog', element: <AdminBlogPage /> },
      { path: 'seo', element: <AdminSeoPage /> },
      { path: 'media', element: <AdminMediaPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
      { path: 'activity-log', element: <AdminActivityLogPage /> },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
