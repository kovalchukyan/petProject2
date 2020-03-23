const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 16
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 16
    },
    contacts: [{
        name: String,
        email: String,
        phone: Number,
        city: String
    }]
});

userSchema.pre('save', function (next) {
    let user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, function(error, salt) {
            if(error) {
                return next(error)
            }

            bcrypt.hash(user.password, salt, function (error, hash) {
                if(error) {
                    return next(error);
                }

                user.password =  hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (error, match) {
        if(error) {
            return callback(error);
        }

        callback(null, match);
    })
};

const User = mongoose.model('User', userSchema);
module.exports = { User };