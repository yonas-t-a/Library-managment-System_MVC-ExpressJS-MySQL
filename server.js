import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import adminRouters from './routers/api/adminRouters.js'
import bookRouters from './routers/api/bookRouters.js'

const app = express();
const PORT =  process.env.PORT || 3501;

app.use('/api/adminstrator', adminRouters)
app.use('/book', bookRouters)


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})