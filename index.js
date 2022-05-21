const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

// middleware
// !Warning : do not use in production 
app.use(cors({
    origin: "*",
}))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bab2f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const servicesCollection = client.db('cleanCo').collection('service');

        app.get('/service', async (req, res) => {
            const services = await servicesCollection.find({}).toArray();
            res.send(services)
        })
    }
    finally {

    }

}
run().catch(console.dir)

app.get('/', async (req, res) => {
    res.send('hello clean co')
})

app.listen(port, () => {
    console.log(`ami Dowrrachi port ${port}`);
})