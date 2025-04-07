import { Card, Col, Row, Typography, Badge, Space, Tag, Button, message, Empty } from 'antd';
import { useEnrollCourseMutation, useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const OfferedCourse = () => {
    const { data: offeredCourses, isLoading } = useGetAllOfferedCoursesQuery(undefined);
    const [Enroll] = useEnrollCourseMutation();

    const singleObject = offeredCourses?.data?.reduce((acc: any, item: any) => {
        const key = item?.course?.title;
        acc[key] = acc[key] || { courseTitle: key, sections: [] };
        acc[key].sections.push({
            section: item?.section,
            _id: item?._id,
            days: item?.days,
            startTime: item?.startTime,
            endTime: item?.endTime,
        })
        return acc;
    }, {});
    const modifiedData = singleObject && Object.values(singleObject);

    const enrollCourse = async (id: any) => {
        const toastId = toast.loading('Enrolling...')
        try {
            const enrollData = {
                offeredCourse: id,
            }
            const res = await Enroll(enrollData);
            console.log(res);
            toast.success('Enrolled successfully', { id: toastId })
        } catch (error) {
            toast.error('Enrollment failed', { id: toastId })
        }
    }

    if (!offeredCourses?.data?.length) {
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
                                No Courses Available!
                            </Title>
                            <Text type="secondary" style={{ fontSize: '16px' }}>
                                Please check back later for new course offerings
                            </Text>
                        </motion.div>
                    }
                />
            </motion.div>
        );
    }


    return (
        <div style={{ padding: '24px' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>Available Courses</Title>

            <Row gutter={[16, 16]}>
                {modifiedData?.map((course: any) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={course.courseTitle}>
                        <Card
                            title={course.courseTitle}
                            hoverable
                            style={{ height: '100%' }}
                        >
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <div>
                                    <Title level={5}>Available Sections:</Title>
                                    {course.sections.map((section: any) => (
                                        <div key={section._id} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                                            <Badge
                                                count={section.section}
                                                style={{
                                                    backgroundColor: '#52c41a',
                                                    marginBottom: '8px'
                                                }}
                                            />
                                            <div style={{ marginTop: '8px' }}>
                                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                                    <div>
                                                        {section.days?.map((day: string) => (
                                                            <Tag key={day} color="blue" style={{ marginRight: '4px' }}>
                                                                {day}
                                                            </Tag>
                                                        ))}
                                                    </div>
                                                    <Text type="secondary">
                                                        Time: {section.startTime} - {section.endTime}
                                                    </Text>
                                                    <Button
                                                        onClick={() => enrollCourse(section._id)}
                                                        type="primary"

                                                        style={{ width: '100%', marginTop: '8px' }}
                                                    >
                                                        Enroll Now
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>

            {isLoading && (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                    Loading courses...
                </div>
            )}
        </div>
    );
};

export default OfferedCourse;