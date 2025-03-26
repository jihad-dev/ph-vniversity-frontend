
import { baseApi } from "../../api/baseApi";
const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            })
        }),
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/students',
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
        getStudentById: builder.query({
            query: (id) => ({
                url: `/students/${id}`,
                method: 'GET',
            }),
            transformResponse: (response: any) => response?.data,
        }),
        // updateStudent: builder.mutation({
        //     query: ({ _id, data }) => ({
        //         url: `/users/change-status/${_id}`,
        //         method: 'POST',
        //         body: data,
        //     }),
        // }),

    })
})

export const { useCreateStudentMutation, useGetAllStudentsQuery,useGetStudentByIdQuery } = userManagementApi;