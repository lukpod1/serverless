'use strict';

const memoize = require('memoizee');
const crypto = require('crypto');
const fs = require('fs');

const getHashForFilePath = memoize(async filePath => {
  const fileHash = crypto.createHash('sha256');
  fileHash.setEncoding('base64');
  try {
    fileHash.write(await fs.promises.readFile(filePath));
    fileHash.end();
    return fileHash.read();
  } catch (error) {
    throw new Error(
      `Error: ${error} encountered during hash calculation for provided filePath: ${filePath}`
    );
  }
});

module.exports = getHashForFilePath;
