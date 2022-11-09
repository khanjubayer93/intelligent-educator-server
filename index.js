const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// meddleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhwdfip.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try {
        const subjectCollection = client.db('intellegentEducator').collection('subjects');

        app.get('/subjects', async(req, res) => {
            const query = {};
            const cursor =  subjectCollection.find(query)
            const subjects = await cursor.toArray();
            res.send(subjects)
        })

    }
    catch (error) {
        console.error(error.name, error.message)
    }

}
run().catch(error => console.error(error.name, error.message))


app.get('/', (req, res) => {
    res.send('intellegent educator server is running on port')
});

app.listen(port, () => {
    console.log(`intellegent educator server is running on port: ${port}`)
});
