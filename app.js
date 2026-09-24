import express from 'express';
import path from 'node:path';
import { loadEnvFile } from 'node:process'
import { messageRouter } from './routes/messageRouter.js';

try {
  loadEnvFile();
} catch (e) { } // oxlint-disable-line

const app = express();
const PORT = process.env.APP_PORT;

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(import.meta.dirname, "public");
app.use(express.static(assetsPath, { maxAge: '1d' }));

app.use(express.urlencoded({ extended: true }));

app.use('/', messageRouter);

app.use((err, req, res, _next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message;
  res.status(errorStatus);

  if (errorStatus === 500) {
    res.render('error-page', {
      errorStatus: errorStatus,
      errorMessage: "The server was unable to complete your request. Please try again later."
    });
    console.log(err.message)
  } else {
    res.render('error-page', { errorStatus: errorStatus, errorMessage: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}`);
})
