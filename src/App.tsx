import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';
import AboutAuthor from './pages/Author';
import Home from './pages/home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/about" element={<AboutAuthor/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App