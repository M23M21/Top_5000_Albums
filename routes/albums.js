const express = require('express');
const router = express.Router();
const Album = require('../models/Albums');

// Get all albums
router.get('/', async (req, res) => {
  try {
    console.log('Fetching albums...');
    const albums = await Album.find();
    console.log('Albums:', albums); // Log the albums data
    res.render('albums', { albums: albums });
  } catch (error) {
    console.error('Error retrieving albums:', error);
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
});

// Get a specific album by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the album' });
  }
});

// Create a new albumå
router.post('/', async (req, res) => {
  const albumData = req.body;
  try {
    const album = new Album(albumData);
    const savedAlbum = await album.save();
    res.status(201).json(savedAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save the album' });
  }
});

// Update an album
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const albumData = req.body;
  try {
    const album = await Album.findByIdAndUpdate(id, albumData, { new: true });
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the album' });
  }
});

// Delete an album
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }
    res.json({ success: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the album' });
  }
});

module.exports = router;