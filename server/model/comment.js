import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },  
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});


const comment = mongoose.model('comment', CommentSchema);

export default comment;