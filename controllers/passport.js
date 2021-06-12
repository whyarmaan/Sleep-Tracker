const User = require("../Models/User");
const GoogleClientID = require("../configurations").ClientID;
const GoogleClientSecret = require("../configurations").ClientSecret;
const GoogleOAuthStratergy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use('googleOauth', new GoogleOAuthStratergy({
    clientID: GoogleClientID,
    clientSecret: GoogleClientSecret,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    
        console.log(await User.find({id: profile.id}))
        const users = await User.find({ id: profile.id });
        if(users.length > 0) {
            return done(null, profile)     
        } 
        console.log('hi2')
        const newUser = new User({
            id: profile.id,
            username: profile.username,
            email: profile.emails[0].value
        });

        await newUser.save()
        done(null, profile)
    
}))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})