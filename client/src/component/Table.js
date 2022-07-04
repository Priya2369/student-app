import { useEffect, useState } from "react";
import { useGetAllStudentMutation } from "../apiService/apiService";
import Delete from './DeleteStudent'
import Form from "./Form"
import UpdateForm from "./UpdateForm"
function Table() {
  const [newCall, setNewCall] = useState(false)
  const [formUpdate, setFormUpdate] = useState(false)
  const params = {
    page: 0,
    limit: 10,
  };

  const [getAllStudent, { data, isLoading, error, isError, isSuccess }] =
    useGetAllStudentMutation();

    useEffect(() => {
      
      getAllStudent(params);
      setNewCall(false)
      setFormUpdate(false)
       //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCall]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      if (error.data) {
        console.log(error.data);
      } else if (error.error) {
        console.log(error.error);
      } else {
        console.log(error);
      }
    }

    if (isSuccess) {
      console.log(data);
      console.log("user register successfully");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  return (
    <>
      {/* <div>
    <input type="email" placeholder="email"/>
    <input type="text" placeholder="phone No"/>

   </div> */}
   {formUpdate?<UpdateForm formUpdate={formUpdate} setNewCall={setNewCall}/>:<Form setNewCall={setNewCall}/>}
   <div className="w-11/12 md:w-7/12 m-auto justify-center mt-8 shadow-xl rounded-xl border-2 overflow-x-scroll md:overflow-x-hidden flex">
      {isSuccess?<table className="w-full m-auto">
        <tr className="bg-green-500 h-12">
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">Name</th>
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">Gender</th>
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">DOB</th>
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">Phone No.</th>
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">Email</th>
          <th className="text-white border-r p-2 md:p-4 border-white font-semibold tracking-wide">Action</th>
        </tr>
        {data.data.map((student,id)=>{
          return <tr key={id} className="border odd:bg-white even:bg-gray-100">
          <td  className="p-4">{student.Name}</td>
          <td  className="p-4">{student.Gender}</td>
          <td  className="p-4">{student.DateOfBirth.split("T")[0]}</td>
          <td  className="p-4">{student.PhoneNumber}</td>
          <td  className="p-4">{student.Email}</td>
          <td  className="p-4 flex gap-2"><button className="bg-blue-500 text-white px-2" onClick={()=>{
            setFormUpdate(student)
          }}>edit</button><Delete id={student._id} setNewCall={setNewCall}/></td>
        </tr>
        })
        }
      </table>:<p>Loading...</p>}
      </div>
    </>
  );
}

export default Table;
