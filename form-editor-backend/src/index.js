import 'dotenv/config';

// dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { connect } from './lib/db.js';
import cors from 'cors';
import { saveBase64ImageToS3 } from './helper/saveToS3.js';
import { resolve } from "path"
import { Form, Response } from './models/Question.js';
import { check } from './helper/checkbase64.js';

const PORT = process.env.PORT || 8080

const app = express()

const S3_URL = process.env.AWS_S3_URL

connect()

const formData = []

app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors());

app.get("/healthcheck", (req, res) => {
    res.send("I am OK");
})

app.get("/forms/responses/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const response = await Response.find({ id })
    const form = await Form.findOne({ id })
    console.log(response)
    
    return res.json({ response: {response,form } })

})

// console.log(process.env.PORT)



app.post("/forms", async (req, res) => {
    const forms = req.body.forms
    console.log(forms)
    try{
    let response = await Form.find({
        $or: forms 
      });
      return res.json({ response: response })
    }catch(err){
        console.log(err)
    }

})


app.post("/form/upload", async (req, res) => {
    const body = req.body;
    // console.log(JSON.stringify(body))
    if (check(body.image)) {
        const key = new Date().getTime().toString();
        if (await saveBase64ImageToS3(body.image, key)) {
            body.image = S3_URL + key;
        }
    }
    body?.questions?.forEach(question => {
        if (check(question.image)) {
            const key = new Date().getTime().toString();
            if (saveBase64ImageToS3(question.image, key)) {
                question.image = S3_URL + key;
            }
        }

    })
    // console.log(body)
    const responseData = await Form.find({ id: body.id })
    if (responseData) {
        await Form.deleteOne({ id: body.id })
    }
    const resp = await Form.create(body)
    console.log(resp)
    const index = formData.findIndex(form => form.id == body.id)
    if (index == -1)
        formData.push(body)
    else
        formData[index] = body

    res.json({ status: "OK" })
})

app.post("/form/submit", async (req, res) => {
    console.log(JSON.stringify(req.body))
    const resp = await Response.create(req.body)
    res.json({ status: "OK" })
})

app.get("/form/:id", async (req, res) => {
    const id = req.params.id;
    // const form = formData.find(form => form.id == id);
    const form = await Form.findOne({ id: id })
    console.log(form)
    if (form) {
        res.json(form)
    } else {
        res.status(404).send("Not Found")
    }
})

app.listen(PORT, () => {
    console.log('Server is listening on port 8080')
})