import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.all('*', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.listen(PORT);
