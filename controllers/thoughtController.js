const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts: GET /api/thoughts
  async getThoughts(req, res) {

    console.log('---> Inside route getThoughts: GET /api/thoughts');
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
      console.log(`---> Retrieved all thoughts. thoughts: ${thoughts}`);
    } catch (err) {
      console.log('---> Error retrieving thoughts');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Get a single thought: GET /api/thoughts/:thoughtId
  async getSingleThought(req, res) {

    console.log('---> Inside route getSingleThought: GET /api/thoughts/:thoughtId');
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
      console.log(`---> Retrieved a single thought. thoughtId: ${req.params.thoughtId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error retrieving a single thought');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Create a new thought: Post /api/thoughts
  async createThought(req, res) {

    console.log('---> Inside route createThought: POST /api/thoughts');
    console.log(`---> req.body.username: ${req.body.username}`);
    console.log(`---> req.body.thoughtText: ${req.body.thoughtText}`);
    try {
      const thought = await Thought.create(req.body);

      // Find the user and update their thoughts array
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        console.log(`---> User (${req.body.username}) not found to associate with newly created thought (${thought})`);

        return res.status(404).json({ message: 'User not found to associate with new thought' });
      }

      res.status(200).json({ thought, user });
      console.log(`---> Created a new thought. thought: ${thought}, user: ${req.body.username}`);
    } catch (err) {
      console.log('---> Error creating thought');
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Update a thought by its _id: PUT /api/thoughts/:thoughtId
  async updateThought(req, res) {

    console.log('---> Inside route updateThought: PUT /api/thoughts/:thoughtId');
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id to update!' });
      }

      res.json(thought);
      console.log(`---> Updated a thought. thoughtId: ${req.params.thoughtId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error updating thought');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Delete a thought by its _id: DELETE /api/thoughts/:thoughtId
  async removeThought(req, res) {

    console.log('---> Inside route removeThought: DELETE /api/thoughts/:thoughtId');
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id to delete!' });
      }

      res.json({ message: 'Thought deleted!' });
      console.log(`---> Deleted a thought. thoughtId: ${req.params.thoughtId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error deleting thought'); 
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Create a new reaction and store it in the specified thought's reactions array field
  //: POST /api/thoughts/:thoughtId/reactions
  async addReaction(req, res) {

    console.log('---> Inside route addReaction: POST /api/thoughts/:thoughtId/reactions');
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id to add a reaction to!' });
      }

      res.json(thought);
      console.log(`---> Added a reaction to a thought. thoughtId: ${req.params.thoughtId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error adding reaction');
      console.error(err);
      res.status(500).json(err);
    }
  },  
  // Remove a reaction by the reaction's reactionId value
  //: DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  async removeReaction(req, res) {
    try {

      console.log('---> Inside route removeReaction: DELETE /api/thoughts/:thoughtId/reactions/:reactionId');
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id to remove a reaction from!' });
      }

      res.json(thought);
      console.log(`---> Removed a reaction from a thought. thoughtId: ${req.params.reactionId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error removing reaction');
      console.error(err);
      res.status(500).json(err);
    }
  } 
  
}; // Ending brace
