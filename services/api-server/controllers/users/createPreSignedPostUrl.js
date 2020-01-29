const AWS = require('aws-sdk');

const {
  config: { s3 }
} = require('../../config');

AWS.config.update({ credentials: s3, region: 'eu-central-1' });

const awsS3 = new AWS.S3();

function createPresignedUrl(params) {
  return new Promise((resolve, reject) => {
    awsS3.createPresignedPost(params, (err, url) => {
      if (err) reject(err);
      resolve(url);
    });
  });
}

module.exports = function createPreSignedPostUrl(fileInfo) {
  const params = {
    Bucket: 'site-plus-direct-upload',
    Expires: 100000,

    Fields: {
      key: `${fileInfo.userId}/${fileInfo.fileName}`
    },
    Conditions: [
      { acl: 'public-read' },
      { success_action_status: '201' },
      ['starts-with', '$key', fileInfo.userId],
      ['content-length-range', 0, 100000],
      {'mimeType': fileInfo.fileType },
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' }
    ]
  };

  return createPresignedUrl(params);
};
