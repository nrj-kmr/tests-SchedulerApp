import dotenv from "dotenv"
import connectDB from "./db/db.config.js";
import app from './app.js';

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send(backendResponse);
    });

    app.listen(port, () => {
      console.log(`Backend listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed !! ", error);
  })

const backendResponse = `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Backend Response</title>
        <style>
          body {
            background-color: #333;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            text-align: center;
          }
          h1 {
            margin-bottom: 10px;
          }
          p {
            font-size: 1.2em;
          }
        </style>
      </head>
      <body>
        <div>
          <h1>Hello from the backend!</h1>
          <p>Backend is running on port ${port} ✅</p>
        </div>
      </body>
    </html>
`