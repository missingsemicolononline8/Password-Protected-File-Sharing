import React from 'react'
import Home from './pages/Home'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FileDownload, { loaderFunc } from './components/FileDownload';
import Error404 from './pages/Error404';
import About from './pages/About';
import Contact from './pages/Contact';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      } >
        <Route index element={<Home />} />
        <Route
          path="/download/file/:fileId"
          loader={loaderFunc}
          element={<FileDownload />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App