const Album = require('../models/Albums');
const express = require('express');
// Get all albums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve albums' });
  }
};

// Get an album by ID
exports.getAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.render("albums", { albums });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the album' });
  }
};

// Create a new album
exports.createAlbum = async (req, res) => {
  const { name, artist, releaseDate } = req.body;

  try {
    const newAlbum = new Album({
      name,
      artist,
      releaseDate,
    });

    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the album' });
  }
};

// Update an album by ID
exports.updateAlbumById = async (req, res) => {
  const { id } = req.params;
  const { name, artist, releaseDate } = req.body;

  try {
    const updatedAlbum = await Album.findByIdAndUpdate(
      id,
      { name, artist, releaseDate },
      { new: true }
    );

    if (!updatedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the album' });
  }
};

// Delete an album by ID
exports.deleteAlbumById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAlbum = await Album.findByIdAndDelete(id);

    if (!deletedAlbum) {
      return res.status(404).json({ error: 'Album not found' });
    }

    res.json({ success: 'Album deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the album' });
  }
};