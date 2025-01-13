import mongoose from 'mongoose';

class UserModel {
    constructor() {
        const UserSchema = mongoose.Schema({
            name: { type: String, required: true },
            username: { type: String, required: true, unique: true },
            password: { type: String, required: true },
        });

        this.model = mongoose.model('User', UserSchema);
    }

    async createUser(data) {
        const user = new this.model(data);
        return await user.save();
    }

    async findUserByUsername(username) {
        return await this.model.findOne({ username });
    }

    async findUserById(userId) {
        return await this.model.findById(userId);
    }
}

class TokenModel {
    constructor() {
        const TokenSchema = mongoose.Schema({
            token: { type: String, required: true },
        });

        this.model = mongoose.model('Token', TokenSchema);
    }

    async createToken(token) {
        const tokenDoc = new this.model({ token });
        return await tokenDoc.save();
    }

    async findToken(token) {
        return await this.model.findOne({ token });
    }

    async deleteToken(token) {
        return await this.model.findOneAndDelete({ token });
    }
}

export const User = new UserModel();
export const Token = new TokenModel();
