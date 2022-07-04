import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_CONSTANTS } from "../config/apiConstant";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_CONSTANTS.baseUrl,
  }),

  endpoints: (builder) => ({
    registerStudent: builder.mutation({
      query: (newStudent) => {
       
        return {
          url: API_CONSTANTS.student.ADD_STUDENT,
          method: "POST",
          body: newStudent,
        };
      },
    }),
    
    updateStudent: builder.mutation({
      query: (newUser) => {
        console.log("Create Post: ", newUser);
        return {
          url: API_CONSTANTS.student.UPDATE_STUDENT+newUser.id,
          method: "PUT",
          body: newUser.formData,
          
        };
      },
    }),

    
    
   
    getAllStudent: builder.mutation({
      query: (params) => {
       
        return {
          url: API_CONSTANTS.student.GET_ALL_STUDENT,
          method: "GET",
          params: params,
          
        };
      },
    }),
    deleteStudent: builder.mutation({
      query: (id) => {
        return {
          url: API_CONSTANTS.student.DELETE_ONE_STUDENT+id,
          method: "DELETE",
          // params: params,
          
        };
      },
    }),
    
  }),
});

export const {
  useRegisterStudentMutation,
 useGetAllStudentMutation,
 useDeleteStudentMutation,
 useUpdateStudentMutation
} = postApi;