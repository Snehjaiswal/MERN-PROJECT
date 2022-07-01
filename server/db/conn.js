const mongoose = require('mongoose');

// const DB = process.env.DATABASE ;

mongoose.connect("mongodb://localhost:27017/mern-project", {
    useNewUrlParser: true,
     useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('connection success');
    } else {
        console.log('connection not success');

    }
})