import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import adminRouters from './routers/api/adminRouters.js'
import bookRouters from './routers/api/bookRouters.js'
import branchRouters from './routers/api/branchesRouters.js'
import catagoriesRouters from './routers/api/catagoriesRouters.js'
import finesRouters from './routers/api/finesRouters.js'
import membersRouters from './routers/api/membersRouters.js'
import nonMemberBorrwerRouters from './routers/api/nonMemberBorrwerRouters.js'
import reservationRouters from './routers/api/reservationRouters.js'
import shelvesRouters from './routers/api/shelvesRouters.js'
import staffRouters from './routers/api/staffRouters.js'
import transactionRouters from './routers/api/transactionRouters.js'
import shelfWithCategory from './routers/api/shelfWithCategoryRoutes.js'

import { setUpDatabase } from './database.js';

const app = express();
const PORT =  process.env.PORT || 3501;

setUpDatabase();

app.use(express.json())


// BackEnd Api Routes
app.use('/api/adminstrator', adminRouters)
app.use('/api/book', bookRouters)
app.use('/api/branch', branchRouters)
app.use('/api/catagorie', catagoriesRouters)
app.use('/api/fines', finesRouters)
app.use('/api/member', membersRouters)
app.use('/api/nonMember', nonMemberBorrwerRouters)
app.use('/api/reservation', reservationRouters)
app.use('/api/shelves', shelvesRouters)
app.use('/api/staffs', staffRouters)
app.use('/api/transaction', transactionRouters)
app.use('/api/shelf-with-category', shelfWithCategory)


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})