import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//pages
import Home from "./pages/Home"
import About from "./pages/About"
import Article from "./pages/Article"
import ArticleList from "./pages/ArticleList"


function App() {
  return (
    <Router>
      <div className='max-w-screen-md mx-auto pt-20'>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/article" element={<Article />}/>
            <Route path="/article-list" element={<ArticleList />}/>
        </Routes>
      </div>
    </Router>
    
  )
}
export default App