import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT =  process.env.PORT || 3501;


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})