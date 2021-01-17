const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  subs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
})


userSchema.statics.checkInMySubs = async function(userId, subId) {


  const subsInfo = await this.find({
    _id: userId,
    followers: { "$in": subId }
  })
  .select({ _id: 1});


  return !!subsInfo;
}

userSchema.statics.getSubs = async function(userId, getNotParse = false) {

  const subs = await this.aggregate([
    { $match : { _id: Types.ObjectId(userId) } },
    {
      $project:{
        subs : 1
      }
    }
  ]);

  if (getNotParse) {
    return subs[0].subs;
  }

  const subsInfo = await this.find({
    _id: { $in: subs[0].subs }
  })
  .select({ _id: 1, nickname: 1, image: 1 });


  return subsInfo;
}

userSchema.statics.getRecomends = async function(userId) {


  const mySubs = await this.getSubs(userId, true);

  mySubs.push(userId)

  const recomends = await this.find(
    {_id: {$nin: mySubs}},
    { image: 1, nickname: 1 }
  );


  return recomends;
}


userSchema.statics.delSub = async function(userId, followerId) {

  const isAlive = await this.findOneAndUpdate(
    {
      _id: userId
    },
    {
      $pull: {
        followers: { "$in": followerId }
      }
    }
  );

  if (!!isAlive) {
    await this.findOneAndUpdate(
      {_id: followerId},
      {
        $pull: {
          subs: { "$in": userId }
        }
      }
    );
  }else{
    return null;
  }


  return !!isAlive;
}

userSchema.statics.setImage = async function(userId, path) {

  await this.findOneAndUpdate(
    {
      _id: userId
    },
    {
      image: path 
    }
  );
  

}

userSchema.statics.setSub = async function(userId, followerId) {

  const isAlive = await this.findOneAndUpdate(
    {
      _id: userId, 
      followers: { "$ne": followerId }
    },
    {
      "$push": { "followers": followerId }
    }
  );

  if (!!isAlive) {
    await this.findOneAndUpdate(
      {_id: followerId},
      {
        "$push": { "subs": userId }
      }
    );
  }else{
    return null;
  }


  return !!isAlive;
}


module.exports = model('User', userSchema)