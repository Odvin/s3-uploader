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

module.exports = function createPreSignedPostUrl(upload) {
  const params = {
    Bucket: 'site-plus-direct-upload',
    Expires: 100000,

    Fields: {
      key: `${upload.reseller}/${upload.userId}/${upload.case}/${upload.id}/${upload.fileName}`
    },
    Conditions: [
      { acl: 'public-read' },
      { success_action_status: '201' },
      ['starts-with', '$key', `${upload.reseller}/${upload.userId}/${upload.case}/${upload.id}`],
      ['content-length-range', upload.minSize, upload.maxSize],
      {'mimeType': upload.mineType },
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' }
    ]
  };
  return createPresignedUrl(params);
};
