const User = require("../Models/User");

module.exports = async(req, res, next) => {
   req.user ?  (async () => {
       const { id } = req.user;
       try{
           await User.find({ id });
           next();
       }catch(err){
           console.log(err);
            return res.json({
                message: 'You ain\'t signed in.'
            })         
       }
   })() : res.json({
       message: 'You ain\'t signed in.'
   }) 
}