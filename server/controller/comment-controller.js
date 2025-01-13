
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        response.status(500).json({ message: 'Server error', error });
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findByIdAndDelete(request.params.id);

        if (!comment) {
            return response.status(404).json('Comment not found');
        }

        response.status(200).json('Comment deleted successfully');
    } catch (error) {
        response.status(500).json({ error: error.message });
        console.log(error);
    }
};
