const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users: GET /api/users
  async getUsers(req, res) {

    console.log('---> Inside getUsers: GET /api/users');
    try {
      const users = await User.find();
      res.json(users);
      console.log(`---> Retrieved all users. users: ${users}`);
    } catch (err) {
      console.log('---> Error retrieving users');
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Get a single user: GET /api/users/:userId
  async getSingleUser(req, res) {

    console.log('---> Inside getSingleUser: GET /api/users/:userId');
    console.log(`---> req.params.userId: ${req.params.userId}`);
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts').populate('friends');
        //.select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      console.log(`---> Retrieved a single user. user: ${user}`); 
    } catch (err) {
      console.log('---> Error retrieving a single user');
      console.error(err);
      res.status(500).json(err);
    }
  },
  // create a new user: POST /api/users
  async createUser(req, res) {

    console.log('---> Inside createUser: POST /api/users');
    try {
      const user = await User.create(req.body);
      res.json(user);
      console.log(`---> Created a new user. user: ${user}`);
    } catch (err) {
      console.log('---> Error creating user');
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Update a user by its _id: PUT /api/users/:userId
  async updateUser(req, res) {

    console.log('---> Inside updateUser: PUT /api/users/:userId');
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
      console.log(`---> Updated a user. user: ${user}`);  
    } catch (err) {
      console.log('---> Error updating user');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Delete a user and associated thoughts: DELETE /api/users/:userId
  async removeUser(req, res) {

    console.log('---> Inside removeUser: DELETE /api/users/:userId');
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      // Remove associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });

      // Delete the user
      await User.findByIdAndDelete(req.params.userId);

      res.json({ message: 'User and associated thoughts deleted!' });
      console.log(`---> Deleted a user and associated thoughts. user: ${user}`);
    } catch (err) {
      console.log('---> Error deleting user');
      console.error(err);
      res.status(500).json(err);
    }
  },

   // Add a new friend to a user's friend list: 
   // POST /api/users/:userId/friends/:friendId
   async addFriend(req, res) {

    console.log('---> Inside addFriend: POST /api/users/:userId/friends/:friendId');
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
      console.log(`---> Added a new friend to user. friendId: ${req.params.friendId}, user: ${user}`);
    } catch (err) {
      console.log('---> Error adding friend to user');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Remove a friend from a user's friend list:
  // DELETE /api/users/:userId/friends/:friendId
  async removeFriend(req, res) {

    console.log('---> Inside removeFriend: DELETE /api/users/:userId/friends/:friendId');
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
      console.log(`---> Removed a friend from user. userId: ${req.params.userId}, friendId: ${req.params.friendId}`);
    } catch (err) {
      console.log('---> Error removing a friend from user');
      console.error(err);
      res.status(500).json(err);
    }
  },    
}; // Ending brace