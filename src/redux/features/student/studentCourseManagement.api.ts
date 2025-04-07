import { baseApi } from "../../api/baseApi";

const studentCourseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        enrollCourse: builder.mutation({
            query: (data) => ({
                url: '/enrolled-courses/create-enrolled-course',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['offeredCourses']
        }),
        getAllOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: ['offeredCourses'],
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        getAllEnrolledCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/enrolled-courses/my-enrolled-courses',
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: ['offeredCourses'],
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),

    })
})

export const { useGetAllOfferedCoursesQuery,useEnrollCourseMutation,useGetAllEnrolledCoursesQuery } = studentCourseManagementApi;