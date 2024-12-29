import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import adminRouter from './routers/api/adminRouters.js'

const app = express();
const PORT =  process.env.PORT || 3501;

app.use('/api/adminstrator', adminRouter)


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})