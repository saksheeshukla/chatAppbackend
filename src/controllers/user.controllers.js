const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');

const chatcontroller = {
    signup: async (req, res) => {
        const { username, email, password , name} = req.body;

        if (!username || !email || !password || !name) {
            return res.status(400).json({ message: 'Provide all details' });
        }

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword ,name});
            console.log({ user });

            await user.save();
            return res.status(201).json({ message: 'User created successfully', user , status:200});
        } catch (error) {
            console.error('Error during user signup:', error);  // Log the error for debugging
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(username,password);

        if (!username || !password) {
            return res.status(400).json({ message: 'Missing username or password' });
        }

        try {
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }

            return res.status(200).json({ message: 'Login successful', user , status:200});
        } catch (error) {
            console.error('Error during user login:', error);  // Log the error for debugging
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },
    updateavatar: async (req, res) => {
        try {
            const newAvatarId = parseInt(req.params.id);
            const username = req.params.user;
            console.log(`Updating avatar for user: ${username} to new avatar id: ${newAvatarId}`);
    
            if (isNaN(newAvatarId)) {
                return res.status(400).json({ message: "Invalid avatar ID" });
            }
    
            const response = await User.updateOne({ username }, { avatar: newAvatarId });
    
            // Check if the update was successful
            if (response.nModified === 0) {
                return res.status(404).json({ message: "User not found or avatar not updated" });
            }
    
            res.status(200).json({ message: "Avatar updated successfully", response });
        } catch (err) {
            console.error("Error updating avatar:", err);
            res.status(500).json({ message: "Internal server error", err });
        }
    }
};

module.exports = chatcontroller;
