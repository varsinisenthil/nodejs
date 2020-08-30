module.exports = async () => {
  //Require models
  const Tweet = require("./models/Tweet");
  const User = require("./models/User");
  //Create Relations 
  User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
  Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });
  //Generic Error Handler 
const errHandler = err => {
  //Catch and log any error.
  console.error("Error: ", err);
};
//create returns a promise which gets resolved to the user instance 
//We also use await, you can use standard then callback.
const user = await User.create({
  username: "alexdmc",
  passwd: "1234567890"
}).catch(errHandler); ///< Catch any errors that gets thrown
//You must provide the userId to get each tweet linked to a single user.
const tweet = await Tweet.create({
  content: "This is actually the tweet content Tweeted from Iphone",
  userId: user.id
}).catch(errHandler);
//Find All Users with Thier Tweets
const users = await User.findAll({
  where: { username: "alexdmc" },
  include: [{ model: Tweet, as: "Tweets" }] ///< include used to eager-load associated model 
}).catch(errHandler);
//log users & tweets
const tweets = await Tweet.findAll({
  where: { username: "alexdmc" },
  include: [{ model: Tweet, as: "Tweets" }] ///< include used to eager-load associated model 
}).catch(errHandler);
console.log("AlexDMC Tweets: ", JSON.stringify(tweets));
};
