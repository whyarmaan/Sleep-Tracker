const Sleep = require("../Models/Sleep");
const Users = require("../Models/User");

exports.getAll = async (req, res, next) => {
    const user = await Users.findOne({id: req.user.id}).populate("sleeps");
    const sleeps = user.sleeps;
    return res.render("crud.ejs", { sleeps: user.sleeps, user: req.user });
}

exports.getone = async (req, res, next) => {
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

exports.deleteOne = async (req, res, next) => {
    try {
        const user = await Users.findOne({id: req.user.id});
        const newSleep = [];
        user.sleeps.forEach(sleep => {
            newSleep.push(sleep) ? sleep._id !== req.params.id : null; 
        })    
        user.sleeps = newSleep;
        await user.save();
        await Sleep.findOneAndDelete({ _id: req.params.id });
        return res.render("notify.ejs", { message: 'Deleted Successfully', color: 'greenyellow' })
    } catch(err) {
        console.log(err)
        return res.render("notify.ejs", { message: 'Something went wrong :(', color: "red" })
    }
    
}

exports.createNew = async (req, res, next) => {
    console.log("Hello?")
    const user = await Users.findOne({id: req.user.id});
    const from = new Date(req.body.from).getTime();
    const to = new Date(req.body.to).getTime();
    const newSleep = new Sleep({
        from,
        to,
        duration: to - from 
    });
    await newSleep.save();
    user.sleeps.push(newSleep);
    await user.save();
    return res.render("notify.ejs", { user: req.user, message: 'New Sleep Created.', color: 'greenyellow' })
}

exports.updateExisting = async (req, res, next) => {
    const user = await Users.findOne({ id: req.user.id }).populate("sleeps");
    const newSleeps = [];
    const from = new Date(req.body.from).getTime();
    const to = new Date(req.body.to).getTime();
    const duration = to - from
    user.sleeps.forEach(sleep => {
        (() => {
            sleep.from = from;
            sleep.to = to;
            sleep.duration = duration;
        })() ? sleep._id == req.params.id : null;        
    });
    await user.save();
    await Sleep.updateOne({_id: req.params.id}, {
        from,
        to,
        duration
    })
    return res.render("notify.ejs", {message: 'Updated Successfully', color: 'greenyellow'})
}

exports.getCreateOne = async(req, res, next) => {
    return res.render("create-sleep.ejs");
}

exports.getUpdateExisting = async(req, res, next) => {
    const sleep = await Sleep.findById(req.params.id);
    return res.render("edit.ejs", { sleep })
}
