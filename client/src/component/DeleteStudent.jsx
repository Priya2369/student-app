import { useDeleteStudentMutation } from "../apiService/apiService";
import { useEffect } from "react";


function DeleteStudent({id, setNewCall}) {
    const [deleteStudent, { data, isLoading, error, isError, isSuccess }] =
    useDeleteStudentMutation();
  
   
    useEffect(() => {
      if (isError) {
        console.log(error);
        if(error.data){
          console.log(error.data)
       
        }else if(error.error){
           console.log(error.error)
        }else{
          console.log(error)
        }
      }
  
      if (isSuccess) {
        console.log(data.data);
        setNewCall(true)
  
      }
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess]);
  
    function handleImgDeleteCLick() {
        deleteStudent(id)
      
  }
  
  return (
    <>
    <button className="bg-red-500 text-white px-2" onClick={()=>{
        handleImgDeleteCLick()
    }}>delete</button>
    </>
  );
}

export default DeleteStudent;
