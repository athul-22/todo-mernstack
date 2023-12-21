import React, { useState, useEffect } from 'react';
import { Card, Divider, Skeleton, Row, Col } from 'antd';

const { Meta } = Card;

const Card1 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
      <Card style={{ }} loading={loading}>
        <Skeleton loading={loading} avatar active>
          <Meta title="Today" description="Todays performance analysis" />
          <Divider />
          {/* Replace the following placeholder with your actual content or graph */}
          <div style={{ height: 'auto', background: '#f0f0f0', marginTop: '10px' }}>
            
          </div>
        </Skeleton>
      </Card>
    </Col>
  );
};

const Card2 = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card style={{ }} loading={loading}>
          <Skeleton loading={loading} avatar active>
            <Meta title="Today" description="Todays performance analysis" />
            <Divider />
            {/* Replace the following placeholder with your actual content or graph */}
            <div style={{ height: 'auto', background: '#f0f0f0', marginTop: '10px' }}>
              
            </div>
          </Skeleton>
        </Card>
      </Col>
    );
  };

  const Card3 = () => {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card style={{ }} loading={loading}>
          <Skeleton loading={loading} avatar active>
            <Meta title="Today" description="Todays performance analysis" />
            <Divider />
            {/* Replace the following placeholder with your actual content or graph */}
            <div style={{ height: 'auto', background: '#f0f0f0', marginTop: '10px' }}>
              
            </div>
          </Skeleton>
        </Card>
      </Col>
    );
  };

const Analysis = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Card1 />
        <Card2 />
        <Card3 />
      </Row>
    </div>
  );
};

export default Analysis;
