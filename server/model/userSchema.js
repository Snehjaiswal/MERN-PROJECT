const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
         type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
         type: String,
        required:true
    },
    password: {
         type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ], 
    tokens: [
        {
            token: {
               type: String,
               required:true 
            }
        }
    ]
})


// we are hashing the password  
userSchema.pre('save', async function (next) {
//  console.log("Hii I am pre ");
    if (this.isModified('password')) {
        // console.log("Hii I am pre password ");
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// we are generating token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// stored the message 

userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}


// collection creation 
const User = mongooose.model('USER', userSchema);

module.exports = User;

