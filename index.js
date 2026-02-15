const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.Port || 3000;

// middleware
app.use(cors());
app.use(express.json());

// smartDealsDB
// xYMpryTdlpXWQmy9
const uri =
  "mongodb+srv://smartDealsDB:xYMpryTdlpXWQmy9@cluster0.og65bqs.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("smart deals server is running ");
});

async function run() {
  try {
    await client.connect();
    // all api here
const database = client.db("smart_db");
const productsCollection = database.collection("products")

// products api here
app.post('/products',async(req,res)=>{
    const newProducts = req.body;
    const result = await productsCollection.insertOne(newProducts);
    res.send (result);


})

// update api for products
app.patch('/products/:id',async(req,res)=>{
  const id = req.params.id;
  const updatedProduct = req.body;
  const query = {_id:new ObjectId(id)}
  const update = {
    $set:{
      name:updatedProduct.name,
      price:updatedProduct.price,
    },
  }
  const result = await productsCollection.updateOne(query,update);
  res.send(result);
})



// delete api for products
app.delete('/products/:id',async(req,res)=>{
  const id = req.params.id;
  const query = {_id:new ObjectId(id)}
  const result = await productsCollection.deleteOne(query);
  res.send (result)

})
// to get all products api
app.get('/products',async(req,res)=>{
const cursor = productsCollection.find();
const result = await cursor.toArray();
res.send(result)

})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`smart deals server started on port:${3000}`);
});
