import url from 'url';
import express from 'express';

const app = express();
const port = 3000;

const isDevelopment = process.env.NODE_ENV === 'production';

app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/get-response', (req, res) => {
  res.redirect(
    url.format({
      pathname: 'http://localhost:4200/',
      query: {
        samlResponse: 'CIAO'
      }
    })
  );
});

app.listen(port, () => {
  //
});
