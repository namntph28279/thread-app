const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

const URL = 'http://192.168.21.108:3000';

//nên chọn server singapo

mongoose
    .connect("mongodb+srv://namnt1:28012003@cluster0.oroyy.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error Connecting to MongoDB");
    });

app.listen(port, () => {
    console.log("server is running on port 3000");
});

const User = require('./models/user');
const Post = require('./models/post');

//endpoint to register a user in the backend
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registed" })
        }

        //create a new user
        const newUser = new User({ name, email, password });

        //generated and store the verification token 
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        //save the user to the db
        await newUser.save();

        //send  the verification email to the user
        sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        console.log('error registering user', error);
        res.status(500).json({ message: 'error registering user' });
    }
})

const sendVerificationEmail = async (email, verificationToken) => {
    //cách tạo -> bật bảo mật 2 lớp -> tạo mật khẩu ứng dụng
    //create a nodemailer transported
    const transported = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nguyenmoc0212@gmail.com",
            pass: "jmpp fekv kowm zxmx"
        }
    });

    //compose the email message
    const mailOption = {
        from: "thread.com",
        to: email,
        subject: "Email Verification",
        text: `please click the following link to verify your email ${URL}/verify/${verificationToken}`
    }

    try {
        await transported.sendMail(mailOption);
    } catch (error) {
        console.log("error sending email", error);
    }
}

app.get('/verify/:token', async (req, res) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: 'Invalid token' });
        }

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
        console.log('error getting token', error);
        res.status(500).json({ message: 'Email verification failed' });
    }
})

const generatedSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    return secretKey;
}

const secretKey = generatedSecretKey();

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid Email' });
        }

        if (user.password != password) {
            return res.status(404).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Login Failed' });
    }
})

//endpoint to access all the users except the logged in the user
app.get('/user/:userId', (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        User.find({ _id: { $ne: loggedInUserId } })
            .then((user) => {
                res.status(200).json(user);
            })
            .catch((error) => {
                console.log('Error: ', error);
                res.status(500).json('error');
            })
    } catch (error) {
        res.status(500).json({ message: 'error getting the users' });
    }
})

//endpoint to follow a particular user
app.post('/follow', async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { followers: currentUserId },
        })

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error in following a user' });
    }
})

//endpoint to unfollow a user
app.post('/users/unfollow', async (req, res) => {
    const { targetUserId, loggedInUserId } = req.body;

    try {
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: loggedInUserId },
        })

        res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing user' });
    }
})

//endpoint create a new post in the backend
app.post('/create-post', async (req, res) => {
    try {
        const { content, userId } = req.body;

        const newPostData = {
            user: userId
        }

        if (content) {
            newPostData.content = content;
        }

        const newPost = new Post(newPostData);
        await newPost.save();
        res.status(200).json({ message: 'Post saved successfully' })
    } catch (error) {
        res.status(500).json({ message: 'post creation failed' })
    }
})

//endpoint for linking a particular post
app.put('/post/:postId/:userId/like', async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await Post.findById(postId).populate('user', 'name');

        const updatePost = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        )

        if (!updatePost) {
            return res.status(404).json({ message: 'post not found' });
        }

        updatePost.user = post.user;
        res.json(updatePost);
    } catch (error) {
        res.status(500).json({ message: 'an error ocurred while linking' });
    }
})

//endpoint to unlike a post
app.put('/post/:postId/:userId/unlike', async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.params.userId;

        const post = await Post.findById(postId).populate('user', 'name');

        const updatePost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        )

        if (!updatePost) {
            return res.status(404).json({ message: 'post not found' });
        }

        updatePost.user = post.user;
        res.json(updatePost);
    } catch (error) {
        res.status(500).json({ message: 'an error ocurred while unlinking the post' });
    }
})

//endpoint to get all the posts
app.get('/get-posts', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'An error ocurred while getting the posts' });
    }
})