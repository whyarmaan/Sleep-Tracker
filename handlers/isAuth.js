const User = require("../Models/User");

module.exports = async(req, res, next) => {
   req.user ?  await (async () => {
       const { id } = req.user;
       try{
           await User.find({ id });
           next();
       }catch(err){
           console.log(err);
            return res.render("notify.ejs", { message: "You gotta sign in first.", color: 'red' })   
       }
   })() : res.render("notify.ejs", { message: 'You gotta sign in first.', color: 'red' })
}