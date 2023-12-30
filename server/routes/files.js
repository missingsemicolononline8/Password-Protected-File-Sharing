const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const CloudmersiveVirusApiClient = require('cloudmersive-virus-api-client');
const fs = require('fs');
const File = require('../models/Files');
const path = require('path');

// Set your Cloudmersive Virus API key here
const cloudmersiveApiKey = process.env.CLOUDMERSIVE_API;

// Configure API key authorization: Apikey
const defaultClient = CloudmersiveVirusApiClient.ApiClient.instance;
const Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = cloudmersiveApiKey;

const api = new CloudmersiveVirusApiClient.ScanApi();

const storage = multer.memoryStorage(); // Use memory storage for initial file buffer
const upload = multer({
  storage,
});

const scanFileForViruses = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    api.scanFile(fileBuffer, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

router.post('/upload',upload.single('sharedFile'),[body('password').isLength({ min: 5 })],async (req, res) => {
    try {
      const { buffer, originalname } = req.file;
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(err => `${err.msg} for ${err.path}`).join('\n') );
      }

      const scanResult = await scanFileForViruses(req.file.buffer);
      if (!scanResult.CleanResult) {
        return res.status(400).send('File is Malicious.');
      }

      const filePath = `uploads/${originalname}`;
      fs.writeFileSync(filePath, buffer);

      const salt = await bcrypt.genSalt();
      const secPass = await bcrypt.hash(req.body.password, salt);

      const newFile = new File({
        name: req.file.originalname,
        location: `/uploads/${req.file.originalname}`,
        password: secPass,
      });

      const fileCreated = await newFile.save();
      return res.status(200).json(fileCreated);
    }
     
    catch (error) {
      console.error('File upload error:', error);
      return res.status(500).send('Internal server error');
    }
  }
);

router.get('/lookup/:fid', async (req, res) => {
  try {
    if (req.params.fid.match(/^[0-9a-fA-F]{24}$/)) {
      const file = await File.findById(req.params.fid);
      if (file) {
        return res.status(200).json({ fileName: file.name });
      }
    }
    return res.status(404).json({ found: false });
  } catch (error) {
    console.error('File lookup error:', error);
    return res.status(500).send('Internal server error');
  }
});

router.post('/download', async (req, res) => {
  const { password, fileId } = req.body;
  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File does not exist' });
    }

    const passwordCompare = await bcrypt.compare(password, file.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Please input correct password' });
    }

    const incrementedDownloads = file.downloads + 1;
    const updateFile = await File.findByIdAndUpdate(
      fileId,
      { $set: { downloads: incrementedDownloads } },
      { new: true }
    );

    return res.status(200).json({ downloadLink: `${process.env.SERVER_HOST}${file.location}` });
  } catch (error) {
    console.error('File download error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

const deleteFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const deleteExpiredFiles = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  //replace sevenDaysAgo with 7 days ago
  

  try {
    const expiredFiles = await File.find({ createdAt: { $lt: sevenDaysAgo } });
    for (const file of expiredFiles) {
      await deleteFile(path.join(__dirname.replace('\\routes',file.location)) );
      await File.findByIdAndDelete(file._id);
    }
  } catch (error) {
    console.error('Error deleting expired files:', error);
  }
};

setInterval(deleteExpiredFiles, 60 * 60 * 24 * 1000); // Run every 24 hours