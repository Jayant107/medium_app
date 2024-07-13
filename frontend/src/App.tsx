import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Signup  from './pages/Signup'
import  Signin  from './pages/Signin'
import Blog  from './pages/Blog'
import Blogs from './pages/Blogs'
import { Suspense } from "react";
import MakeBlog from './pages/MakeBlog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path='/makeblog' element={<MakeBlog/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App