import axios from './axios';

export const loginUser = async ({ email, password }) => {
  const { data } = await axios.post('/auth/login', { email, password });
  return data;
};

export const signupUser = async ({ name, email, password }) => {
  const { data } = await axios.post('/auth/signup', { name, email, password });
  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post('/auth/logout');
  return data;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data.user;
  } catch (error) {
    console.log("error in logoutn")
    return null
  }
};

export const getAllPosts = async () => {
  const { data } = await axios.get('/posts/getAllposts');
  return data;
};

export const getUserPosts = async (userId) => {
  const res = await axios.get(`/posts/user/${userId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const createPost = async ({content}) => {
  const res = await axios.post("/posts/create", { content });
  return res.data;
};
