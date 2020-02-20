import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { List, Button, Row, Col } from 'antd';

import { reqUserUploads } from '../../api';

function CompletedUploads() {
  const { _id: userId } = useSelector(state => state.userInfo);

  const [completedUserUploads, setCompletedUserUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserUploads(userId) {
      const userUploads = await reqUserUploads(userId);
      setCompletedUserUploads(userUploads);
    }

    getUserUploads(userId);
  }, [userId]);

  async function updateCompletedUploads() {
    setIsLoading(true);

    const { resData: userUploads, reqFailed } = await reqUserUploads(userId);

    if (!reqFailed) {
      setCompletedUserUploads(userUploads);
    }

    setIsLoading(false);
  }

  return (
    <>
      <Row>
        <Col style={{textAlign: 'right'}}>
          <Button
            icon='reload'
            loading={isLoading}
            onClick={updateCompletedUploads}
          >
            Update
          </Button>
        </Col>
      </Row>
      {completedUserUploads.length && (
        <List
          dataSource={completedUserUploads}
          renderItem={item => (
            <List.Item key={item._id}>
              <List.Item.Meta
                title={`${item.case} :: ${item.name}`}
                description={`mime: ${item.mime}; bucket: ${item.bucket} size: ${item.size} uploaded: ${item.uploadedAt}`}
              />
              {item.location}
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default CompletedUploads;
