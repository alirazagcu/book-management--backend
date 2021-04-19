const mongoose = require('mongoose');
require('dotenv').config();
const db_host = process.env.DB_HOST || 'mongodb://localhost:27017/Books-management';
console.log(db_host)
mongoose.connect( db_host, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false
}).then(()=>{
    console.log('connected to mongodb databse')
}).catch((e) =>{
    console.log('Error occured during connectionn ...... ',e)
})
