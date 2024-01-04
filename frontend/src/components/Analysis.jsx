import React, { useState, useEffect } from "react";
import { Card, Divider, Skeleton, Row, Col } from "antd";
import axios from "axios";

const { Meta } = Card;

const Analysis = () => {
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [tasksDoneToday, setTasksDoneToday] = useState([]);
  const [previousDayTasks, setPreviousDayTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch completed tasks
        const response = await axios.get("/api/tasks/userCompletedTask");
        const completedTasks = response.data;
        console.log(response.data);
        // Assuming that the createdAt field represents the task completion date
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        // Filter tasks done today and previous day
        const tasksToday = completedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return (
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate()
          );
        });

        const tasksYesterday = completedTasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          return (
            taskDate.getFullYear() === yesterday.getFullYear() &&
            taskDate.getMonth() === yesterday.getMonth() &&
            taskDate.getDate() === yesterday.getDate()
          );
        });

        // Update state
        setTasksDoneToday(tasksToday);
        setPreviousDayTasks(tasksYesterday);

        setLoading1(false);
        setLoading2(false);
        setLoading3(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
  <Card style={{}} loading={loading1}>
    <Skeleton loading={loading1} avatar active>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Meta title={`Today: ${tasksDoneToday.length}`} />
        <div style={{ fontSize: '24px', marginLeft: '10px' }}>
  {previousDayTasks.length < tasksDoneToday.length ? (
    <div style={{ color: '#52b788', backgroundColor: '#d8f3dc', width: '35px', height: '35px', borderRadius: '20px', display: 'inline-block', textAlign: 'center' }}>
      ↑
    </div>
  ) : (
    <span style={{ color: '#ff0a54', backgroundColor: '#ffccd5', width: '35px', height: '35px', borderRadius: '20px', display: 'inline-block', textAlign: 'center' }}>↓</span>
  )}
</div>

      </div>
      <Divider />
      <Meta
        title=""
        description={`Tasks Completed Yesterday: ${previousDayTasks.length}`}
      />
      {/* Render your content or graph using tasksDoneToday */}
      <div
        style={{
          height: 'auto',
          background: '#f0f0f0',
          marginTop: '10px',
        }}
      >
        {/* Your content or graph goes here */}
      </div>
    </Skeleton>
  </Card>
</Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{}} loading={loading2}>
            <Skeleton loading={loading2} avatar active>
              <Meta
                title="Yesterday"
                description={`Tasks done yesterday: ${previousDayTasks.length}`}
              />
              <Divider />
              {/* Render your content or graph using previousDayTasks */}
              <div
                style={{
                  height: "auto",
                  background: "#f0f0f0",
                  marginTop: "10px",
                }}
              >
                {/* Your content or graph goes here */}
              </div>
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* Add your Card3 component here, using tasksDoneToday and previousDayTasks as needed */}
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
