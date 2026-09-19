import express from 'express';
import path from 'node:path';
import { loadEnvFile } from 'node:process'
import { messageRouter } from './routes/messageRouter.js';

loadEnvFile()

const app = express();
const PORT = process.env.PORT;

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded());

app.use('/', messageRouter);

app.use((err, req, res, _next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message;
  res.status(errorStatus);
  res.render('404', { errorStatus: errorStatus, errorMessage: errorMessage });
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
})
