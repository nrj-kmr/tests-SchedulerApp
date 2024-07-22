import dotenv from  "dotenv"
import connectToDB from './db';
import { app } from './app';

dotenv.config({path: "./.env"});

const port = 3000;

connectToDB()
.then(() => {
  app.get('/', (req, res) => {
    res.send('Hello from Backend');
  });
  
  app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
  });
})
.catch((error) => {
   console.error("DB connection failed !! ", error);
})