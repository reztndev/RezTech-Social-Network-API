async removeThought(req, res) {
    console.log('---> Inside route removeThought: DELETE /api/thoughts/:thoughtId');
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
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
  }

  // -------------------------------------------------

  /**
   * Explanation of the update:
      After successfully deleting the thought (Thought.findOneAndDelete()), we use User.findOneAndUpdate() 
      to find the user who has this thought's ID in their thoughts array and remove the reference ($pull operator).
      This ensures that the thought's ID is no longer present in the user's thoughts array once the thought has been deleted.
   */

  async removeThought(req, res) {
    console.log('---> Inside route removeThought: DELETE /api/thoughts/:thoughtId');
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id to delete!' });
      }
  
      // Remove the thought ID from the user's thoughts array
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
  
      res.json({ message: 'Thought deleted and reference removed from user!' });
      console.log(`---> Deleted a thought and removed reference. thoughtId: ${req.params.thoughtId}, thought: ${thought}`);
    } catch (err) {
      console.log('---> Error deleting thought');
      console.error(err);
      res.status(500).json(err);
    }
  }
  
  