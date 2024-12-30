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

const app = express();
const PORT =  process.env.PORT || 3501;

app.use('/api/adminstrator', adminRouters)
app.use('/book', bookRouters)
app.use('/branch', branchRouters)
app.use('/catagorie', catagoriesRouters)
app.use('/fines', finesRouters)
app.use('/member', membersRouters)
app.use('/nonMember', nonMemberBorrwerRouters)
app.use('/reservation', reservationRouters)
app.use('/shelves', shelvesRouters)
app.use('/staffs', staffRouters)
app.use('/transaction', transactionRouters)


app.listen(PORT ,  () => {
    console.log(`The app listining at port ${PORT}`)
})