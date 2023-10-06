import mongoose,{Model,Schema,Document} from "mongoose";

export interface IFile extends Document {
    name: string;
    Url: string;
    size:number;
    Uploader:Object;
    }
const FileSchema = new Schema({
    name: { type: String, required: true },
    Url: { type: String, required: true },
    size:{type:Number,required:true},
    Uploader:{type:Schema.Types.ObjectId,ref:"User"}

},{timestamps:true});

const FileModel = mongoose.models.File || mongoose.model<IFile>("File",FileSchema);
export default FileModel;



