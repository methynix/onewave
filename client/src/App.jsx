import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import ProductDetails from './pages/ProductDetails';
import ContactPage from './pages/ContactPage';
import CategoryPage from './pages/CategoryPage';
import AboutUs from './pages/AboutPage';


const RootLayout = () => (
  <div className="min-h-screen bg-brand-black text-white flex flex-col">
    <Navbar />
    <main className="flex-grow max-w-[1920px] mx-auto w-full px-4 sm:px-8 lg:px-16 py-8">
      <Outlet />
    </main>
    <Footer/>
    <Toaster position="bottom-right" />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> }, 
      { path: "product/:id", element: <ProductDetails /> }, 
      { path: "category/:cat", element: <CategoryPage /> },
      { path: "contact", element: <ContactPage /> },
      {path:"about",element:<AboutUs/>},
      { path: "brand/:brandName", element: <BrandPage /> }
    ]
  }
]);

export default function App() {
  // Hapa haturudishi tena AuthProvider kwa sababu ishawekwa main.jsx
  return <RouterProvider router={router} />;
}