import React, { useState, useEffect } from 'react';

import { reqQuota, reqPreSignedUrl, uploadFile } from './api';

function App() {
  const [userQuota, setUserQuota] = useState(null);

  useEffect(() => {
    async function getUserQuota(userId) {
      const quota = await reqQuota(userId);
      console.log(quota);
      setUserQuota(quota);
    }

    getUserQuota('5e32cedcd707dd012a7626e3');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (e.target.file.files.length) {
      const file = e.target.file.files[0];

      const fileInfo = {
        userId: '5e32cedcd707dd012a7626e3',
        case: 'document',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };

      const {url, uploadId } = await reqPreSignedUrl(fileInfo);
      const uploadRes = await uploadFile(url, file);
      console.log(uploadRes);
      console.log(uploadId);
    }
  }

  return (
    <div>
      {userQuota && (
        <div>
          <p>
            User quota for <strong>{userQuota.name}</strong> is fetched:
          </p>
          <p>
            storage usage: <strong>{userQuota.storageUsage}</strong>
          </p>
          <p>
            storage size: <strong>{userQuota.storageSize}</strong>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Choose file to upload</label>
        <input type='file' name='file'></input>
        <input type='submit' value='Send' />
      </form>
    </div>
  );
}

export default App;
