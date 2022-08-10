const express=require('express');
const mongodb=require('mongodb');
const cors=require('cors');
const app=express();
const port=3001;
const { MongoClient, ServerApiVersion, MongoRuntimeError} = require('mongodb')

const pwd=encodeURIComponent('Abhishekmh7@')

const URI = `mongodb+srv://abhishekmh7:${pwd}@cluster0.evmqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(cors());


app.get('/grocery/getall', async (req,res)=>{
 const collection=client.db("Training").collection("grocery");
 console.log(collection);
 const result= await collection.find({}).toArray()
 console.log(result)
 res.send(result);
})

app.use(express.json());

app.post('/grocery/add', async (req,res)=>{
    const collection=client.db("Training").collection("grocery");
    console.log(collection);
    const item = req.body;
    const result = await collection.insertOne(item);
    console.log(result)
    res.send({"result" : "success"})
   })

   app.put('/grocery/updatePurchaseStatus', async (req,res)=>{
    const collection=client.db("Training").collection("grocery");
    console.log(collection);
    console.log(req.body._id)
    const result = await collection.updateOne(
        {"_id":new mongodb.ObjectId(req.body._id)},
        {$set:
            {isPurchased:true}
        }
    );
    console.log(result)
    res.send({"result" : "success"})
   })
  
  app.delete("/grocery/deleteGroceryItem", async (req, res) => {
    const collection=client.db("Training").collection("grocery");
    console.log(req.body._id);
    const result = await collection.deleteOne({
      _id: mongodb.ObjectId(req.body._id),
    });
  console.log(result)
    res.send({"result" : "success"});
  });
  
app.listen(port,()=>{
    console.log(`app is running on ${port}`)
})
client.connect(async err => {

    console.log(err);
    console.log("Connected")
});