import axios from 'axios';
import convert from 'xml-js';

export const uploadFile = async (preSignedUrl, file) => {
  let upload = null;

  const { url, fields } = preSignedUrl;

  const formData = new FormData();

  const keys = Object.keys(fields);

  for (const key of keys) {
    formData.append(key, fields[key]);
  }

  formData.append('acl', 'public-read');
  formData.append('success_action_status', '201');
  formData.append('mimeType', file.type);

  formData.append('file', file);

  const { data, status } = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if (status === 201) {
    const { PostResponse } = convert.xml2js(data, { compact: true });

    if (PostResponse) {
      const { Location, Bucket, Key } = PostResponse;
      if (Location && Bucket && Key) {
        const location = Location._text || null;
        const bucket = Bucket._text || null;
        const key = Key._text || null;

        if (location && bucket && key) {
          upload = {
            location,
            bucket,
            key
          };
        }
      }
    }
  }

  return upload;
};
