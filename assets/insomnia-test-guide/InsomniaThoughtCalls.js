// thoughtController Calls

// createThought 
// Post /api/thoughts
{
    "thoughtText": "The summer is unusually hot this year.",
    "username": "John"
}

// updateThought 
// PUT /api/thoughts/:thoughtId
{
    "thoughtText": "Looking forward to fall given how hot it's been this summer.",
    "username": "John"
}

// getThoughts
// GET /api/thoughts
{}

// getSingleThought
// GET /api/thoughts/:thoughtId
{}

// removeThought
// DELETE /api/thoughts/:thoughtId
{}

// ----------------------------------------------
// Note: 
// 1. Create multiple users
// 2. Choose a user's thoughtId to include in path
// 3. Choose another user's username to include in reaction body
// 4. Create a reaction body

// addReaction
// POST /api/thoughts/:thoughtId/reactions
{
    "reactionBody": "I totally agree with you!",
    "username": "Peter"
}

// ----------------------------------------------
// removeReaction
// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
{}

