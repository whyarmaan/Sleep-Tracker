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
    
    try {
        console.log("hi")
        const user = await User.find({ id: profile.id })[0];
        if(user === undefined) {
            throw new Error("User Ain't Added To The DB")
        } 
        done(null, profile)     
    } catch (error) {
        console.log('hi2')
        const user = new User({
            id: profile.id,
            username: profile.username,
            email: profile.emails[0].value
        });

        await user.save()
        done(null, profile)
    }
    
}))

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})