const mongoose = require('mongoose');
const Album = require('./models/Albums');
const Review = require('./models/Reviews');
const User = require('./models/Users');
require('dotenv').config();

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Seeding logic
    const albumsData = [
      // Array of album objects
    ];

    const reviewsData = [
      // Array of review objects
    ];

    const usersData = [
      // Array of user objects
    ];

    const seedData = async () => {
      try {
        await Album.insertMany(albumsData);
        console.log('Albums seeded successfully');

        await Review.insertMany(reviewsData);
        console.log('Reviews seeded successfully');

        await User.insertMany(usersData);
        console.log('Users seeded successfully');
      } catch (error) {
        console.error('Error seeding data:', error);
        throw error;
      }
    };

    // Call the seedData function to perform the seeding
    try {
      await seedData();
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding the database:', error);
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });