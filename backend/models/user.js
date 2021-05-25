const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuidv1')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },

    email:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },

    hashedPassword: {
        type: String,
        required: true
    },

    about: {
        type: String,
        trim: true,
    },

    salt: String,
    role: {
        type: Number,
        default: 0
    },

    history: {
        type: Array,
        default: []
    },
    
},{ timestamps: true })


//Virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashedPassword = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    encryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        }catch(err){
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);