import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app  from './app.js';

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

connectDB()
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