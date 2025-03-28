import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  year: z.string({ required_error: "Year is required" }),
  startMonth: z.string({ required_error: "Start Month is required" }),
  endMonth: z.string({ required_error: "End Month is required" }),
});
export const offeredCourseSchema = z.object({
  semesterRegistration: z.string({ required_error: "Semester Registration is required" }),
  startTime: z.string({ required_error: "Start Time is required" }),
  endTime: z.string({ required_error: "End Time is required" }),
  faculty: z.string({ required_error: "Faculty is required" }),
  days: z.string({ required_error: "Days is required" }),
  academicFaculty: z.string({ required_error: "Academic Faculty is required" }),
  course: z.string({ required_error: "Course is required" }),
  academicDepartment: z.string({ required_error: "Academic Department is required" }),
  section: z.string({ required_error: "Section is required" }),
  maxCapacity: z.string({ required_error: "Max Capacity is required" }),

});