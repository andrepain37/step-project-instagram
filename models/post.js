
const {Schema, model, Types} = require('mongoose')
const Comment = require('./comment')

const postSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  likesUser: {
    type: Array,
    default: Array
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})


postSchema.statics.withLastComment = async function(limit = 3, page = 1) {


  const skip = limit * page - limit;

  const posts = await this.aggregate([
    {
      $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
            { $sort: {date: -1} },
            { $limit: 1 },
          ],
          as: "lastComment",
      }
    },
    {
      $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [{ $match: { $expr: { $eq: ["$$userId", "$_id"] } } }],
          as: "user"
      }  
    },
    { $sort: {date: -1} },
    {
       $skip: skip
    },
    {
      $limit: limit
    }
  ]);


  return posts;
}

postSchema.statics.oneWithCommentsByPostId = async function(postId) {

  const post = await this.aggregate([
    {$match: {_id: Types.ObjectId(postId)}},
    {
      $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$$postId", "$postId"] } } }
          ],
          as: "comments",
      }
    },
    {
      $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [{ $match: { $expr: { $eq: ["$$userId", "$_id"] } } }],
          as: "user"
      }  
    }
  ]);


  return post[0];
}

postSchema.statics.getUserPosts = async function(userId) {

  const posts = await this.aggregate([
    {$match: {userId: Types.ObjectId(userId)}}, 
    {
      $lookup: {
        from: "comments",
        let: { postId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$$postId", "$postId"] } } },
        ],
        as: "comments",
      }
    },
    {
      $project: {
        image: 1,
        likes: { $size: "$likesUser" },
        comments: { $size: "$comments" },
        date: 1
      }
    },
    
    { $sort: {date: -1} },
  ]);


  return posts;
}


module.exports = model('Post', postSchema)