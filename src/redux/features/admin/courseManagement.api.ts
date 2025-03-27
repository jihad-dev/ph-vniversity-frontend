
import { baseApi } from '../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semester']
        }),
        getAllRegisteredSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: { name: string; value: string }) => {
                        params.append(item.name, item.value);
                    });
                }
                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params,
                }
            },
            providesTags: ['semester'],
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        updateRegisteredSemester: builder.mutation({
            query: (args) => ({
                url: `semester-registrations/${args?.id}`,
                method: 'PATCH',
                body: args?.data,
            }),
            invalidatesTags: ['semester']
        }),
        getAllCourses: builder.query({
            query: () => {
             return {
                    url: '/courses',
                    method: 'GET',
                }
            },
            providesTags: ['courses'],
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),
        addCourses: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses']
        }),

    }),
});

export const {
    useAddRegisteredSemesterMutation,
    useGetAllRegisteredSemesterQuery,
    useUpdateRegisteredSemesterMutation,
    useAddCoursesMutation,
    useGetAllCoursesQuery,

} = courseManagementApi;