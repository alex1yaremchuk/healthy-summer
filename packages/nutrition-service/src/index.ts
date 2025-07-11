import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ service: 'nutrition-service' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('nutrition-service listening on ' + port));
