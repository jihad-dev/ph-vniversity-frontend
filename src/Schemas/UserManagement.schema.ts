import { z } from "zod";

export const createStudentSchema = z.object({
    name: z.object({
        firstName: z.string({
            required_error: "First Name is required",
            invalid_type_error: "First Name must be a string",
        }),
        middleName: z.string().optional(),
        lastName: z.string({
            required_error: "Last Name is required",
            invalid_type_error: "Last Name must be a string",
        }),
    }),
    gender: z.string({
        required_error: "Gender is required",
        invalid_type_error: "Gender must be a string",
    }),
    // dateOfBirth: z.string({
    //     required_error: "Date of Birth is required",
    //     invalid_type_error: "Date of Birth must be a valid date string",
    // }),
    bloodGroup: z.string({
        required_error: "Blood Group is required",
        invalid_type_error: "Blood Group must be a string",
    }),

    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a valid string",
    }).email("Invalid email address"),
    contactNo: z.string({
        required_error: "Contact No is required",
        invalid_type_error: "Contact No must be a string",
    }),
    emergencyContactNo: z.string({
        required_error: "Emergency Contact No is required",
        invalid_type_error: "Emergency Contact No must be a string",
    }),
    presentAddress: z.string({
        required_error: "Present Address is required",
        invalid_type_error: "Present Address must be a string",
    }),
    permanentAddress: z.string({
        required_error: "Permanent Address is required",
        invalid_type_error: "Permanent Address must be a string",
    }),

    guardian: z.object({
        fatherName: z.string({
            required_error: "Father Name is required",
            invalid_type_error: "Father Name must be a string",
        }),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string({
            required_error: "Mother Name is required",
            invalid_type_error: "Mother Name must be a string",
        }),
        motherOccupation: z.string().optional(),
        motherContactNo: z.string().optional(),
    }),

    localGuardian: z.object({
        name: z.string({
            required_error: "Local Guardian Name is required",
            invalid_type_error: "Local Guardian Name must be a string",
        }),
        occupation: z.string().optional(),
        contactNo: z.string({
            required_error: "Local Guardian Contact No is required",
            invalid_type_error: "Local Guardian Contact No must be a string",
        }),
        address: z.string({
            required_error: "Local Guardian Address is required",
            invalid_type_error: "Local Guardian Address must be a string",
        }),
    }),

    admissionSemester: z.string({
        required_error: "Admission Semester is required",
        invalid_type_error: "Admission Semester must be a string",
    }),
    academicDepartment: z.string({
        required_error: "Academic Department is required",
        invalid_type_error: "Academic Department must be a string",
    }),
})

