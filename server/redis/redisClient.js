import redis from 'redis';

const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

redisClient.on('error', (error) => {
    console.log(error);
    console.error('Redis error:', error);
});
            
redisClient.connect().then(() => {
    console.log('Connected to Redis');
});

export default redisClient;

