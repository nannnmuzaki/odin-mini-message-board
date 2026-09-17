import express from 'express';
import { loadEnvFile } from 'node:process'

loadEnvFile()

const app = express();
const PORT = process.env.PORT;

app.get('/', async (req, res) => {
  res.send("<p>holla world</p>");
})

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
})
