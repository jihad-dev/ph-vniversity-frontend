
import { baseApi } from "../../api/baseApi";
const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getAllSemesters: builder.query({
        //     query: (args) => {
        //         const params = new URLSearchParams();
        //         if (args) {
        //             args.forEach((item: { name: string; value: string }) => {
        //                 params.append(item.name, item.value);
        //             });
        //         }
        //         return {
        //             url: '/academic-semesters',
        //             method: 'GET',
        //             params: params,
        //         }
        //     },
        //     transformResponse: (response: any) => {
        //         return {
        //             data: response?.data,
        //             meta: response?.meta,
        //         }
        //     }
        // }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data,
            })
        }),
 
        
    })
})

export const { useCreateStudentMutation} = userManagementApi;