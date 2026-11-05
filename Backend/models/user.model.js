import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    firebaseUid:{

        type:String,
        required:true,
        unique:true,
    },
    
    name:{
        type:String,
        required:true,
        unique:true
    },

    email:{

        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },

    profilePicture:{

        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User