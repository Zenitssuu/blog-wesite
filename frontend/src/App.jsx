import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//components
import NavBar from "./components/navBar"

//pages
import Home from "./pages/Home"
import About from "./pages/About"
import Article from "./pages/Article"
import ArticleList from "./pages/ArticleList"
import NotFound from "./pages/notFound"


function App() {
  return (
    <Router>
      <NavBar />
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/article-list" element={<ArticleList />}/>
            <Route path="/article/:name" element={<Article />}/> 
            {/* /:parameter for direccting diff articles as per requirement */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    
  )
}
export default App
