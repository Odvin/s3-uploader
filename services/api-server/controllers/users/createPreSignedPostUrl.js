const AWS = require('aws-sdk');

const {
  config: { s3 }
} = require('../../config');

AWS.config.update({ credentials: s3, region: 'eu-central-1' });

const awsS3 = new AWS.S3();

module.exports = async function createPreSignedPostUrl(fileInfo) {
  const params = {
    Bucket: 'site-plus-direct-upload',
    Expires: 100000,

    Fields: {
      key: fileInfo.fileName
    },
    conditions: [
      { acl: 'private' },
      { success_action_status: '201' },
      ['starts-with', '$key', fileInfo.userId],
      ['content-length-range', 0, 100000],
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' }
    ]
  };
 

  return awsS3.createPresignedPost(params);
};
