const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=giftierepo;AccountKey=HkekKosUsu/3cs8LVGDezhe9X3o62OvwigNioBG+CqCEWjGK6eDmcwYl0M3EpkTnTEuPX4IPb4LR+AStEb7KLQ==;EndpointSuffix=core.windows.net';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('giftiecontainer');

router.post('/', upload.single('photo'), async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.files.photo.name;
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.uploadData(req.files.photo.data);
    const fileUrl = blockBlobClient.url; // Get the URL of the uploaded file
    res.status(200).send({ message: 'File uploaded successfully.', fileUrl });
  } catch (err) {
    res.status(500).send('Error uploading file.');
  }
});

module.exports = router;
