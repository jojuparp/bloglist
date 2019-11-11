const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    minlength: 4
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)