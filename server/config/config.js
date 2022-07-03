require('dotenv').config()
module.exports = {
    MONGODBURI : 'mongodb://localhost:27017/ogbo' || process.env.MONGODBURI,
}