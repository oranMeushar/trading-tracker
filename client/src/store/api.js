import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const getToken = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user).token : null  
}

export const usersAPI = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        tagTypes: ['Trade', 'Symbol', 'Cards'],
        baseUrl: 'http://localhost:8080/api/v1',
        prepareHeaders: headers => {
            // headers.set('Content-Type', 'application/json');
            // headers.set('Accept', 'application/json');
            const token = getToken();
            token && headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // getUsers: builder.query({
        //     query: () => ({url: `/users`,method:'GET'}),
        //     providesTags: ['User'],
        //     // providesTags: (result, error, arg) => {
        //     //     return  result
        //     //         ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
        //     //         : ['User']
        //     // },
        // }),
        // getUser: builder.query({
        //     query: ({id}) => ({url: `/users/${id}`,method:'GET'}),
        //     providesTags: ['User'],
        //     // providesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
        // }),
        // updateUser: builder.mutation({
        //     query: ({name,email,age, id}) => ({url: `/users/${id}`,method: 'POST',body: {name,email,age}}),
        //     invalidatesTags: ['User'],
        //     // invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
        // }),
        addTrade: builder.mutation({
            query: (body) => ({url: `/trades`,method: 'POST',body}),
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            invalidatesTags: ['Trade','Symbol','Cards', 'Stats'],
        }),
        getTrades: builder.query({
            query:({selectedDate}) => ({url: `/trades?startDate=${selectedDate.startDate}&endDate=${selectedDate.endDate}`,method:'GET'}),
            providesTags: ['Trade'],
        }),
        getSymbols: builder.query({
            query:() => ({url: `/symbols`,method:'GET'}),
            providesTags: ['Symbol'],
        }),
        getCards: builder.query({
            query:({selectedDate}) => ({url: `/trades/cards?startDate=${selectedDate.startDate}&endDate=${selectedDate.endDate}`,method:'GET'}),
            providesTags: ['Cards'],
        }),
        setLogin: builder.mutation({
            query: ({email, password}) => ({url: `/auth/login`,method: 'POST',body: {email, password}}),
            invalidatesTags: ['User'],
        }),
        setSignup: builder.mutation({
            query: ({name,email,password,passwordConfirm}) => ({url: `/auth/signup`,method: 'POST',body: {name,email,password,passwordConfirm}}),
            invalidatesTags: ['User'],
        }),
        setInitialNet: builder.mutation({
            query: ({initial}) => ({url: `/trades/initial`,method: 'POST',body: {initial}}),
            invalidatesTags: ['Cards'],
        }),
        getStats: builder.query({
            query:({selectedDate}) => ({url: `/trades/stats?startDate=${selectedDate.startDate}&endDate=${selectedDate.endDate}`,method:'GET'}),
            providesTags: ['Stats'],
        }),
        getTrade: builder.query({
            query:({id}) => ({url: `/trades/${id}`,method:'GET'}),
            providesTags: ['Trade'],
        }),
        getInitialNet: builder.query({
            query:() => ({url: `/trades/initial`,method:'GET'}),
            providesTags: ['Cards'],
        }),
        deleteTrade: builder.mutation({
            query: ({id}) => ({url: `/trades/${id}`,method: 'DELETE'}),
            invalidatesTags: ['Trade','Symbol','Cards'],
        }),
        // getTradesLogs: builder.query({
        //     query:({selectedDate}) => ({url: `/trades/logs?startDate=${selectedDate.startDate}&endDate=${selectedDate.endDate}`,method:'GET'}),
        //     providesTags: ['Logs'],
        // }),
    }),
});



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    // useGetUsersQuery,
    // useGetUserQuery,
    // useUpdateUserMutation,
    useAddTradeMutation,
    useGetTradesQuery,
    useGetSymbolsQuery,
    useGetCardsQuery,
    useSetLoginMutation,
    useSetSignupMutation,
    useSetInitialNetMutation,
    useGetStatsQuery,
    useGetTradeQuery,
    useGetInitialNetQuery,
    useDeleteTradeMutation,
    // useGetTradesLogsQuery,
    //* i use prefetch hare and in userCard for practice, but it's not necessary
    // usePrefetch
} = usersAPI;
