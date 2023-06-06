const express = require('express');
const router = express.Router();
const Album = require('../models/Albums');
const User = require('../models/Users');
const Review = require('../models/Reviews');
// GET route for fetching albums with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 20; 
  const skip = (page - 1) * limit; // 
  
  try {
    const totalAlbums = await Album.countDocuments(); 
    const totalPages = Math.ceil(totalAlbums / limit); 
    const albums = await Album.find().limit(limit).skip(skip);
    res.render('albums', { albums: albums, currentPage: page, totalPages: totalPages }); // pass currentPage and totalPages to the view
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// GET route for reading a single album
router.get('/read/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.render('albumDetail', { album: album });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});
// GET route for the edit page
router.get('/edit/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.render('editAlbum', { album: album });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});

// PUT route for updating an album
router.put('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.redirect('/albums/read/' + req.params.id); // redirect to the updated album page
  } catch (error) {
    res.status(500).json({ error: 'Failed to update album' });
  }
});


// Root route
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find();
    res.render('index', { albums: albums });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// POST route for creating a new album
router.post('/', async (req, res) => {
  const album = new Album(req.body);
  try {
    await album.save();
    res.redirect('/albums'); // Redirect to the root route after successful creation
  } catch (error) {
    res.status(500).json({ error: 'Failed to create album' });
  }
});

// GET route for reading a single album
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});

// PUT route for updating an album
router.put('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update album' });
  }
});
// GET route for the delete confirmation page
router.get('/delete/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.render('deleteAlbum', { album: album });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve album' });
  }
});
// DELETE route for deleting an album
router.delete('/:id', async (req, res) => {
  
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    // Redirect to the album list after deletion
    res.redirect('/albums');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete album' });
  }
});



module.exports = router;
