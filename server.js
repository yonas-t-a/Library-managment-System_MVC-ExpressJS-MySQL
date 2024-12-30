import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import adminRouters from './routers/api/adminRouters.js'
import bookRouters from './routers/api/bookRouters.js'
import branchRouters from './routers/api/branchesRouters.js'
import catagoriesRouters from './routers/api/catagoriesRouters.js'

const app = express();
const PORT =  process.env.PORT || 3501;

app.use('/api/adminstrator', adminRouters)
app.use('/book', bookRouters)
app.use('/branch', branchRouters)
app.use('/catagorie', catagoriesRouters)


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})