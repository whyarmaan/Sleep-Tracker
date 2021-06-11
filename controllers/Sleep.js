const Sleep = require("../Models/Sleep");
const Users = require("../Models/User");

exports.getAll = async (req, res, next) => {
    const user = await Users.find({id: req.user.id})[0];
    return res.json({sleeps: user.sleeps});
}

exports.getOne = async (req, res, next) => {
    const user = await Users.find({ id: req.user.id });
    console.log(user[0]);
    user[0].sleeps.forEach(sleep => {
        if(sleep._id == req.params.id) {
            return res.json({
                sleep
            })
        }
    });
    return res.json({message: 'No sleep found.'})
}