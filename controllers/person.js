const Person = require('../model/person');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateTokens');



const registerUser = asyncHandler(async (req, res) => {

    // res.status(200).json({message: 'user created sucessfully'})
    const { name, email, password } = req.body;
  
    const userExists = await Person.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await Person.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await Person.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });



  const getUserProfile = asyncHandler(async (req, res) => {
    const user = await Person.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Person.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });


  const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };



module.exports ={
    registerUser,
    authUser,
    getUserProfile,
    logoutUser,
    updateUserProfile
}
