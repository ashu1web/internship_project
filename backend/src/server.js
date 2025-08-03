import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

const __dirname=path.resolve()

app.use(cors({
  origin: 'http://localhost:5173',  // your frontend URL
  credentials: true,                // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);



if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    
   app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
   })
}


// MongoDB Connect & Server Start
app.listen(PORT, () => {
  console.log(`PORT is running at ${PORT} PORT `)
  connectDb()
})
