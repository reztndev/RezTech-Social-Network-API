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
  