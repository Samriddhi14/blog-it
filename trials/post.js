import mongoose from 'mongoose';

class PostModel {
    constructor() {
        const PostSchema = mongoose.Schema({
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            title: { type: String, required: true, unique: true },
            description: { type: String, required: true },
            picture: { type: String },
            username: { type: String, required: true },
            categories: { type: Array },
            createdDate: { type: Date, default: Date.now },
        });

        this.model = mongoose.model('Post', PostSchema);
    }

    async createPost(data) {
        const post = new this.model(data);
        return await post.save();
    }

    async getPostById(postId) {
        return await this.model.findById(postId).populate('userId');
    }

    async updatePost(postId, updatedData) {
        return await this.model.findByIdAndUpdate(postId, updatedData, { new: true });
    }

    async deletePostById(postId) {
        return await this.model.findByIdAndDelete(postId);
    }
}

export const Post = new PostModel();
