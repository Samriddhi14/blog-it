import mongoose from 'mongoose';

// Token Schema
const TokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
});

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Token = mongoose.model('Token', TokenSchema);
const User = mongoose.model('User', UserSchema);

export { Token, User };