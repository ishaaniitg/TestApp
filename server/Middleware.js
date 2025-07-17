import jwt from 'jsonwebtoken'
import Student from './models/StudentModel.js'
const middleWare = async (req,res,next)=>{ // middleware called in all  routes that need to verify security
    try {
        const token = req.headers.authorization.split(' ')[1] // from beared token this method gets token ( arr[1] from array of strings created by whiteSpaces )
       
        if(!token){
            return res.status(404).json({success:false , error :  'Token not found'})
        }
        const decoded =  jwt.verify(token , process.env.JWT_SECRET_KEY) // verify token with token , security key , and returns the decoded payload ( which as _id of user)
       
        if(!decoded){
             return res.status(404).json({success:false , error :  'Token not found'})
        }
        const user = await Student.findById({_id:decoded.id}).select('-password') // first find user with that payload , store in user every info except his password 
      
        req.student = user // redirect the request to next route handler , with new object loaded in request
        next()
    } catch (error) {
        return res.status(404).json({success:false , error :  'Server Error'})
    }
}
export default middleWare