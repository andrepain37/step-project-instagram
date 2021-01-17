const {Schema, model, Types} = require('mongoose')

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
})


commentSchema.statics.allWithUserInfo = async function(postId = 0) {


  if(!postId){
    return null
  }

  let returnedComments = [];

  const comments = await this.aggregate([
    { $match : { postId: Types.ObjectId(postId) } },
    { $sort: {date: 1} },
    {
      $lookup: {
        from: "users",      
        localField: "userId",   
        foreignField: "_id", 
        as: "user" 
      }
    },
    { $unwind:"$user" },
    {   
      $project:{
          _id : 1,
          comment : 1,
          name : "$user.nickname",
      } 
    }
  ]);

  for (let i = 0; i < comments.length; i++) {

    const obj = comments[i];

    obj.id = obj._id;
    delete obj._id;

    returnedComments.push(obj);
  }


  


  return returnedComments;
}

module.exports = model('Comment', commentSchema)