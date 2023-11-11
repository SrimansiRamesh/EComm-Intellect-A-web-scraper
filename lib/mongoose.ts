import mongoose from 'mongoose';

let isconnected=false;
export const connecttoDB= async()=>{
  mongoose.set('strictQuery',true);

  if(!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

  if(isconnected) return console.log('=> using existing database connection');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isconnected=true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error)
  }

}