
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    console.log('Request:', request);
    try {
        const post = new Post({
            ...request.body,
            userId: request.user.id,
        });
        
        await post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        await post.deleteOne();

        response.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        response.status(500).json({ message: 'Server error', error });
    }
};


export const getPost = async (request, response) => {
    try {
        console.log("ID received:", request.params.id);
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ msg: "Post not found" });
        }

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
};


export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
        console.log(error);
    }
}