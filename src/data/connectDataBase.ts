import mongoose from 'mongoose';

const MongoURI: string = process.env.mongoURI || 'mongodb://localhost:27017/users';

export const connectDB = async () => {
    try {
        await mongoose.connect(MongoURI, {
        })
        console.log("connected to DB");
    } catch (err) {
        console.log(err);
    }
}
