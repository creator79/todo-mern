import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import todoRoutes from './routes/todos.routes';
import userRoutes from './routes/users.routes';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// reading connection details from dotenv file
const dbConnection: string | undefined = process.env.DB_CONN_STRING;
const dbName: string | undefined = process.env.DB_NAME;
const collectionTodosName: string | undefined = process.env.DB_TODOS_COLLECTION_NAME;
const collectionUsersName: string | undefined = process.env.DB_USERS_COLLECTION_NAME;

const servicePort: string = process.env.SERVICE_PORT || '8080';
const serviceIpAddress: string = process.env.SERVICE_IP_ADDRESS || "localhost";


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Other options if needed
};

// Connecting to MongoDB
const connectToMongoose = () => {
    if (!dbConnection) {
      console.error('MongoDB connection string is undefined.');
      return;
    }
  
    mongoose.connect(dbConnection, options)
      .then(() => {
        console.log('MongoDB connected');
      })
      .catch((err: any) => {
        console.error('MongoDB connection error:', err);
      });
  };

connectToMongoose();

app.use(`/${collectionTodosName}`, todoRoutes);
app.use(`/${collectionUsersName}`, userRoutes);

console.log(collectionTodosName)


app.listen(servicePort, () => {
  
    console.log(` backend  listening on port http://localhost:${servicePort}`)
})






export default app;
