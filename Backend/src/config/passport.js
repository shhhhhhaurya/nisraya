const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const name = profile.displayName || "Google User";

        if (!email) {
          return done(new Error("Google account does not have an email"));
        }

        // 1. Check if this Google account already exists
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // 2. Check if an account already exists with the same email
        user = await User.findOne({ email });

        if (user) {
          // Link the Google account to the existing account
          user.googleId = googleId;

          await user.save();

          return done(null, user);
        }

        // 3. Create a brand-new Google account
        user = await User.create({
          name,
          email,
          password: null,
          authProvider: "google",
          googleId,
        });

        return done(null, user);
      } catch (error) {
        console.error("Google Strategy Error:", error.message);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;