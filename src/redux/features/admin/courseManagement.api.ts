
import { baseApi } from '../../api/baseApi';

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addRegisteredSemester: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
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
            transformResponse: (response: any) => {
                return {
                    data: response?.data,
                    meta: response?.meta,
                }
            }
        }),

    }),
});

export const {
    useAddRegisteredSemesterMutation,
    useGetAllRegisteredSemesterQuery

} = courseManagementApi;