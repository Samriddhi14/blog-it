import Schema from "../model/schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

 
export const signupUser = async (request, response) => {
    try{
        //const user = request.body;
        const hashedPassword = await bcrypt.hash(request.body.password,10);
        const user = { 
            username: request.body.username, 
            name: request.body.name, 
            password: hashedPassword 
        }
        const newUser = new Schema.User(user);
        await newUser.save();
        return response.status(200).json({msg: 'Signup successful'})
    }catch(error){
        console.log(error);
        return response.status(500).json({msg: 'Error while signing up'})
    }
}

export const loginUser = async (request, response) => {
    const { username, password } = request.body;

    // Validate input
    if (!username || !password) {
        return response.status(400).json({ msg: 'Username and password are required' });
    }

    try {
        // Check if user exists
        const user = await Schema.User.findOne({ username });
        if (!user) {
            return response.status(400).json({ msg: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate tokens
        const payload = { id: user._id, username: user.username, name: user.name };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY);

        // Save refresh token in the database
        const newToken = new Schema.Token({ token: refreshToken });
        await newToken.save();

        // Send response and exit
        return response.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username,
        });
    } catch (error) {
        console.error('Error during user login:', error);
        return response.status(500).json({ msg: 'Error while logging in the user' });
    }
};
