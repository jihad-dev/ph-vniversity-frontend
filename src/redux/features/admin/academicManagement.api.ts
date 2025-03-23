
import { baseApi } from "../../api/baseApi";
const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/academic-semesters',
                    method: 'GET',
                    params: params,
                }
            },
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: '/academic-semesters/create-academic-semester',
                method: 'POST',
                body: data,

            })
        }),
        getAcademicFaculty: builder.query({
            query: () => ({
                url: '/academic-faculties',
                method: 'GET',
            }),
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        createAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: '/academic-faculties/create-academic-faculty',
                method: 'POST',
                body: data,

            })
        }),
        // get academic departments
        getAcademicDepartments: builder.query({
            query: () => {
                return {
                    url: '/academic-departments',
                    method: 'GET',
                };
            },
            transformResponse: (response: any) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        // create a new academic department 
        createAcademicDepartment: builder.mutation({
            query: (data) => {
                return {
                    url: '/academic-departments/create-academic-department',
                    method: 'POST',
                    body: data,
                };
            },
        }),
    })
})

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation, useCreateAcademicFacultyMutation, useGetAcademicFacultyQuery,useGetAcademicDepartmentsQuery,useCreateAcademicDepartmentMutation } = academicManagementApi;