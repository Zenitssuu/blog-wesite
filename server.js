import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 8000;

//dummy
// const articlesInfo = {
//   "learn-react": {
//     comments: [],
//   },
//   "learn-node": {
//     comments: [],
//   },
//   "my-thoughts-on-react": {
//     comments: [],
//   },
// };

//middleware
// we used this so tht we dnt have to install body parser
// it pareses incoming json payload
app.use(express.json({ extended: false }));

const withDB = async (opts, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("mernblog");
    await opts(db);
    // console.log(1);
    client.close();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error connecting to DB", error });
  }
};

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    // console.log(req.params);

    const articlesInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    return res.status(200).json(articlesInfo);
  }, res);
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    console.log(articleInfo);    
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comment: articleInfo.comment.concat({ username, text }),
        },
      }
    );
    const updateAricleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updateAricleInfo);
  }, res);
});

app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
