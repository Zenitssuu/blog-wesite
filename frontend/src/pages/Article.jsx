import React from "react";
import { useParams } from "react-router-dom";
import articlesContent from "./articleContents";

// components
import Articles from "../components/articles";

// pages
import NotFound from "./notFound";

function Article() {

  const {name} = useParams(); 
  // variable name should be same as the parameter name used in route in app.jsx

  const article = articlesContent.find((article) => article.name === name);

  if(!article) return < NotFound/>

  const otherArticles = articlesContent.filter((article) => article.name!==name)

  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {article.content.map((paragraph,index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>{paragraph}</p>
      ))}

      <h1 className="sm:text:2xl text-2xl font-bold my-4 text-graay-900">
        Other Articles
      </h1>
      <div className="flex flex-wrap -m-4">
          <Articles articles={otherArticles}/>
      </div>
    </>
  );
}

export default Article;
