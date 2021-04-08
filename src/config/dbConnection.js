const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Books-management', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false
}).then(()=>{
    console.log('connected to mongodb databse')
}).catch((e) =>{
    console.log('Error occured during connectionn ...... ',e)
})
