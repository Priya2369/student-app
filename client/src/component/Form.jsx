import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRegisterStudentMutation } from "../apiService/apiService";
import TextField from "@mui/material/TextField";

import "./Form.css";
import * as Yup from "yup";

function StudentForm({ setNewCall }) {
const [errorMsg, setErrorMsg] = useState(false)

  const [registerStudent, { data, isLoading, error, isError, isSuccess }] =
    useRegisterStudentMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
      if (error.data) {
        console.log(error.data.error);
        setErrorMsg(error.data.error);
      } else if (error.error) {
        console.log(error.error);
        // setErrorMsg(error.error)
      } else {
        console.log(error);
        // setErrorMsg(error)
      }
    }

    if (isSuccess) {
      console.log(data);
      console.log("user register successfully");
      setNewCall(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const initialValues = {
    Name: "",
    Email: "",
    PhoneNumber: "",
    Gender: "",
    DateOfBirth: "",
  };
  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .matches(
        /^[a-z ]([a-z ,.'-]*)+(\s[a-z ,.'-]+)*$/i,
        "Please enter valid Name"
      )
      .max(100)
      .required("Name is required"),
    Email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    PhoneNumber: Yup.string()
      .required("Phone no. is Required")
      .trim()
      .length(10, "Invalid Mobile No")
      .matches(/^[6-9]+[0-9]+$/, "Invalid Mobile No"),
    Gender: Yup.string().required("Gender is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    registerStudent({ ...values });
    resetForm();
  };

  return (
    <>
      <div className="w-11/12 md:w-7/12 m-auto justify-center mt-8  overflow-x-scroll md:overflow-x-hidden flex">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form className=" flex flex-col items-center p-10 bg-white md:w-1/2 w-full rounded-2xl space-y-4 border shadow-lg ">
              <p className="text-gray-700 font-sans font-bold text-2xl">
                STUDENT FORM
              </p>
              <div className="w-full mx-auto  space-y-4">
                <div>
                  <Field
                    as={TextField}
                    className="w-full"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="Name"
                    type="text"
                    placeholder="Name"
                  />

                  <div className="bg-red-500 w-full text-center rounded text-white mx-auto">
                    <ErrorMessage name="Name" />
                  </div>
                </div>
                <div>
                  <Field
                    as={TextField}
                    className="w-full"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    name="Email"
                    type="text"
                    placeholder="Email"
                  />
                  <div className="bg-red-500 w-full text-center rounded text-white mx-auto">
                    <ErrorMessage name="Email" />
                  </div>
                </div>
                <div>
                  <Field
                    as={TextField}
                    className="w-full"
                    id="outlined-basic"
                    label="Phone No."
                    variant="outlined"
                    name="PhoneNumber"
                    type="text"
                    placeholder="Phone No."
                  />
                  <div className="bg-red-500 w-full text-center rounded text-white mx-auto">
                    <ErrorMessage name="PhoneNumber" />
                  </div>
                </div>
                <div>
                  <Field
                    as={TextField}
                    className="w-full "
                    // id="outlined-basic"
                    label="DOB"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="DateOfBirth"
                    type="date"
                  />
                  <div className="bg-red-500 w-full text-center rounded text-white mx-auto">
                    <ErrorMessage name="DateOfBirth" />
                  </div>
                </div>
                <div className="grid space-y-4">
                  <span className="font-semibold	">Gender</span>
                  <div className="flex space-x-4">
                    <label>
                      <Field type="radio" name="Gender" value="Male" />
                      <span className="text-sm ml-2 font-medium text-blue-500">
                        Male
                      </span>
                    </label>
                    <label>
                      <Field type="radio" name="Gender" value="Female" />
                      <span className="text-sm ml-2 font-medium text-blue-500">
                        Female
                      </span>
                    </label>
                  </div>
                  {/* <FormHelperText error> */}
                  <div className="bg-red-500 w-full text-center rounded text-white mx-auto">
                    <ErrorMessage name="gender" />
                  </div>
                  {/* </FormHelperText> */}
                </div>
                {isError&&<p className="text-red-500">{errorMsg}</p>}
                <div className="mt-5 flex justify-center">
                  
                  <button
                    type="submit"
                    className="w-10/12 h-12 rounded font-semibold bg-green-500 text-white focus:outline-none focus:ring focus:border-blue-500"
                    ripple="light"
                  >
                    Registration
                  </button>
                  
                  
                </div>
              
              </div>
            </Form>
          )}
        </Formik>
      </div>
      
    </>
  );
}

export default StudentForm;
