import mongoose,{Document,Model,Schema} from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  status:boolean;
}

const UserSchema = new Schema({
  email: { type: String, required: true,unique:true },
  name: { type: String, required: true },
  status:{type:Boolean,default:false}
});

const User = mongoose.models.User || mongoose.model<IUser>("User",UserSchema);
// const User = m mongoose.model<IUser>("User",UserSchema);

export default User;


