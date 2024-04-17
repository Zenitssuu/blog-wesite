import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articlesContent from "./articleContents";

// components
import Articles from "../components/articles";
import Comments from "../components/comments";
import AddComments from "../components/addComments";

// pages
import NotFound from "./notFound";

function Article() {
  const { name } = useParams();
  // variable name should be same as the parameter name used in route in app.jsx
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  useEffect(() => {
    // console.log("component mounted");
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      console.log(result);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };

    fetchData();
  }, [name], setArticleInfo);

  const article = articlesContent.find((article) => article.name === name);
  if (!article) return <NotFound />;

  const otherArticles = articlesContent.filter(
    (article) => article.name !== name
  );

  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        {article.title}
      </h1>
      {article.content.map((paragraph, index) => (
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
          {paragraph}
        </p>
      ))}
      <Comments  comments={articleInfo.comment}/>
      <AddComments articleName={name} setArticleInfo={setArticleInfo}/>

      <h1 className="sm:text:2xl text-2xl font-bold my-4 text-graay-900">
        Other Articles
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </>
  );
}

export default Article;
