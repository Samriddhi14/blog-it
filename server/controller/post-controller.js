
import Post from '../model/post.js';
import redisClient from '../redis/redisClient.js';


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
        const postId = request.params.id;
        console.log("ID received:", postId);
        
        const cacheKey = `post:${postId}`;
        const exists = await redisClient.get(cacheKey);

        if (exists) {
            console.log('Serving post from Redis cache');
            return response.status(200).json(JSON.stringify(cachedPost));
        }

        const post = await Post.findById(postId);

        if (!post) {
            return response.status(404).json({ msg: "Post not found" });
        }
        await redisClient.set(cacheKey, JSON.stringify(post), { EX: 360 });

        console.log('Serving post from MongoDB and caching it');
        response.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        response.status(500).json({ msg: error.message });
    }
};


export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let page = parseInt(request.query.page) || 1; 
    let limit = parseInt(request.query.limit) || 4; 
    let posts;

    try {
        const filter = {};
        if (username) filter.username = username;
        if (category) filter.categories = category;

        const totalPosts = await Post.countDocuments(filter);
        posts = await Post.find(filter).skip((page - 1) * limit) .limit(limit); 

        response.status(200).json({
            data: posts,
            total: totalPosts,
            page,
            pages: Math.ceil(totalPosts / limit),
        });
    } catch (error) {
        response.status(500).json(error);
    }
};
