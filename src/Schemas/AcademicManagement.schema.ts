import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    year: z.string({ required_error: "Year is required" }),
    startMonth: z.string({ required_error: "Start Month is required" }),
    endMonth: z.string({ required_error: "End Month is required" }),
  });