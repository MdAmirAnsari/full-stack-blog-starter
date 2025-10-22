// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ImageKitProvider } from "@imagekit/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ClerkProvider } from '@clerk/clerk-react';

// Import your pages/components
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Write from './routes/Write.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
} 

// Define routes
const router = createBrowserRouter([
 {
  element: <MainLayout />,
  children:[
     { path: "/", element: <Homepage /> },
  { path: "/post", element: <PostListPage /> },
  { path: "/:slug", element: <PostListPage /> },
  { path: "/write", element: <Write /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path:"/test" , element:<SinglePostPage/>}
  ]
 }
]);

// Render app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ImageKitProvider urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}>
      <RouterProvider router={router} />
    </ImageKitProvider>
    </ClerkProvider>
  </StrictMode>
);
