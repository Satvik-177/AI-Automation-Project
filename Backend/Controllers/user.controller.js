import { app } from "../Config/firebase.js"
import { getAuth } from "firebase-admin/auth"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const login = async(req,res)=>{

    try{

        const {token:firebaseToken} = req.body

    if(!firebaseToken){
        return res.status(400).json({
            message:"token not found"
        })
    }

//     Code	                  Function
// getAuth(app)	       Firebase Auth instance
// verifyIdToken()	   verify Firebase token
// decoded	           decoded info of Verified token

    const decoded = await getAuth(app).verifyIdToken(firebaseToken)

    const user = await User.findOneAndUpdate(
        {firebaseUid:decoded.uid},
        {
            $set:{     //update
                
                name:decoded.name,
                email:decoded.email,
                profilePicture:decoded.picture
            },
            $setOnInsert:{ // will only run if user comes first time (only for new documents)

                firebaseUid:decoded.uid
            }
        },
        {
              // $set tells MongoDB WHAT to update.
              // upsert: true tells MongoDB WHAT to do if no document is found.

            upsert:true,  //update + insert
            returnDocument:"after" //will return user's info after updation
        }
      )

       const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})

       res.cookie("token",token,{

        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
       })

       return res.status(200).json(user)
    }

    catch(err){

        return res.status(500).json({message:`Login error ${err}`})
    }
    
}

export const logout = async(req,res)=>{

    try{

        res.clearCookie("token",{

            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({message:"Logout Successfully"})
    }

    catch(err){

        return res.status(500).json({message:`Logout error ${err}`})
    }
}

export const getMe = async(req,res)=>{

    try{

        const user = req.user
        return res.status(200).json(user)
    }

    catch(err){

        return res.status(500).json({message:`User not authenticated`})
    }

}

