const mongoose = require('mongoose');
const Album = require('./models/Albums');
const Review = require('./models/Reviews');
const User = require('./models/Users');
require('dotenv').config();

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
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

    module.exports = { seedData };

    // Insert albums
    Album.insertMany(albumsData)
      .then(() => {
        console.log('Albums seeded successfully');
      })
      .catch((error) => {
        console.error('Error seeding albums:', error);
      });

    // Insert reviews
    Review.insertMany(reviewsData)
      .then(() => {
        console.log('Reviews seeded successfully');
      })
      .catch((error) => {
        console.error('Error seeding reviews:', error);
      });

    // Insert users
    User.insertMany(usersData)
      .then(() => {
        console.log('Users seeded successfully');
      })
      .catch((error) => {
        console.error('Error seeding users:', error);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });