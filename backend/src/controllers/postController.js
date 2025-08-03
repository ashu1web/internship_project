import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({
      content:content,
      author: req.user._id,
    });
    console.log(req.user.userId)
    console.log(post)
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create post' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch posts' });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password'); // exclude password
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch user profile' });
  }
};

