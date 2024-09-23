const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); 

const moment = require('moment');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      //get: (timestamp) => dateFormat(timestamp),  
      get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),  // Custom getter to format the date
    },  
    username: {
      type: String,
      required: true,
    },  
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property called reactionCount that retrieves the length of the thoughts's reactions array field on query
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize the Thoughts model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
