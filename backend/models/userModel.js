import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    vendor_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: false
    },
    is_admin:{
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;