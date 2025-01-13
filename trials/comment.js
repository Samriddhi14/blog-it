import mongoose from 'mongoose';

class CommentModel {
    constructor() {
        const CommentSchema = mongoose.Schema({
            name: { type: String, required: true },
            postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
            date: { type: String, required: true },
            comments: { type: String, required: true },
        });

        this.model = mongoose.model('Comment', CommentSchema);
    }

    async createComment(data) {
        const comment = new this.model(data);
        return await comment.save();
    }

    async getCommentsByPostId(postId) {
        return await this.model.find({ postId }).populate('postId');
    }

    async deleteCommentById(commentId) {
        return await this.model.findByIdAndDelete(commentId);
    }
}

export const Comment = new CommentModel();
