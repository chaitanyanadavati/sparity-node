const mongoose = require('mongoose');
const { dbConfig } = require('./../config');

mongoose.Promise = global.Promise;
global.ObjectId = mongoose.Types.ObjectId;

module.exports.connect = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(dbConfig.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
            resolve('success');
            console.log("Mongo db connection successful");
        } catch (error) {
            console.log('Could not connect to the database. Exiting now...' + error);
            reject('failure');
            process.exit();
        }
    });
}