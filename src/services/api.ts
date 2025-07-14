import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { Food } from '../pages/Home'

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://fake-api-tau.vercel.app/api/efood'
    }),
    endpoints: (builder) => ({
        getFeaturedFood: builder.query<Food[], void>({
            query: () => 'restaurantes'
        }),
        getPerfil: builder.query<Food, string>({
            query: (id) => `restaurantes/${id}`
        })
    })
})

export const { useGetFeaturedFoodQuery, useGetPerfilQuery } = api

export default api