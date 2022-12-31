import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai' 

dotenv.config()

const configuration = new Configuration({
  //organization: "org-j57KZcybbptMahh8SaBt8r7t",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Sveta, your favorite AI!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const headers = {
      'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
    };
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    }, { headers: headers });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(3000, () => console.log('Sveta server started on http://localhost:3000'))
