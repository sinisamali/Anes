const mongoose = require('mongoose');

// **Konekcija sa MongoDB**
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/users_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// **Definicija šeme za korisnike**
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Koristite String za UUID
  name: { type: String, required: true },
  city: { type: String },
  country: { type: String },
  gender: { type: String },
  about_me: { type: String },
  age: { type: Number },
  services: { type: String },
  image_urls: { type: [String], default: [] },
  video_urls: { type: [String], default: [] },
});

const User = mongoose.model('User', userSchema);

const updateAboutMe = async () => {
  try {
    const users = await User.find({
      age: { $exists: true },
      gender: { $exists: true },
      country: { $exists: true },
      city: { $exists: true },
      about_me: { $exists: true },
    });

    let updatedCount = 0;

    const updatePromises = users.map(async (user) => {
      const regex = new RegExp(
        `${user.age}\\s+godina/e,\\s+pol\\s+${user.gender}\\s+iz\\s+${user.city},\\s+${user.country}`,
        'g'
      );

      console.log(`Processing user: ${user.name}`);
      console.log(`Generated regex: ${regex}`);
      console.log(`About Me: "${user.about_me}"`);

      if (!regex.test(user.about_me)) {
        console.log(`Pattern not found for user: ${user.name}`);
        return;
      }

      const updatedAboutMe = user.about_me.replace(regex, '').trim();

      if (user.about_me !== updatedAboutMe) {
        console.log(`Updating user: ${user.name}`);
        console.log(`Old about_me: "${user.about_me}"`);
        console.log(`New about_me: "${updatedAboutMe}"`);
        await User.findByIdAndUpdate(user._id, { about_me: updatedAboutMe });
        updatedCount++;
      }
    });

    await Promise.all(updatePromises);

    console.log(`About_me field updated for ${updatedCount} users`);
  } catch (err) {
    console.error('Error updating users:', err);
  } finally {
    mongoose.connection.close();
  }
};

updateAboutMe();
