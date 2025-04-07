import { Card, Col, Row, Typography, Tag, Timeline, Empty, Spin } from 'antd';
import { ClockCircleOutlined, CalendarOutlined, BookOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const { Title, Text } = Typography;

const Schedule = () => {
    const { data: enrolledCourses, isLoading } = useGetAllEnrolledCoursesQuery(undefined);

   

    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
                <Text style={{ display: 'block', marginTop: '20px' }}>Loading your schedule...</Text>
            </div>
        );
    }

    if (!enrolledCourses?.data?.length) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    padding: '24px'
                }}
            >
                <Empty
                    description={
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Title level={3} style={{ color: '#1890ff' }}>
                                No Courses Enrolled
                            </Title>
                            <Text type="secondary" style={{ fontSize: '16px' }}>
                                You haven't enrolled in any courses yet
                            </Text>
                        </motion.div>
                    }
                />
            </motion.div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>
                    My Course Schedule
                </Title>
            </motion.div>

            <Row gutter={[16, 16]}>
                {enrolledCourses?.data?.map((item: {
                    _id: string;
                    course: { title: string };
                    offeredCourse: {
                        days: string[];
                        startTime: string;
                        endTime: string;
                        section: string;
                    };
                }, index: number) => (
                    <Col xs={24} md={12} lg={8} key={item._id}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card
                                hoverable
                                style={{
                                    height: '100%',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Title level={4} style={{ color: '#1890ff', marginBottom: '16px' }}>
                                    <BookOutlined style={{ marginRight: '8px' }} />
                                    {item?.course.title}
                                </Title>

                                <div style={{ marginBottom: '16px' }}>
                                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                        <CalendarOutlined style={{ marginRight: '8px' }} />
                                        Class Days:
                                        {item?.offeredCourse?.days?.map((day: string) => (
                                            <Tag color="blue" key={day} style={{ margin: '4px' }}>
                                                {day}
                                            </Tag>
                                        ))}
                                    </Text>
                                </div>

                                <div style={{ marginBottom: '16px' }}>
                                    <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                                        <ClockCircleOutlined style={{ marginRight: '8px' }} />
                                        Time:
                                    </Text>
                                    <Tag color="green">
                                        {item.offeredCourse.startTime} - {item.offeredCourse.endTime}
                                    </Tag>
                                </div>

                                <div>
                                    <Text strong>Section: </Text>
                                    <Tag color="purple">{item.offeredCourse.section}</Tag>
                                </div>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Schedule;