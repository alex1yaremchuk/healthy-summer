import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ service: 'activity-service' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('activity-service listening on ' + port));
