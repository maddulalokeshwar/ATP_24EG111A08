import {useForm} from "react-hook-form"
import axios from "axios"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function EditEmployee() {
  const { register, 
          handleSubmit, 
          formState:{errors},
        setValue,
      } = useForm()
  const {state} = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    setValue("name", state.name)
    setValue("email", state.email)
    setValue("mobile", state.mobile)
    setValue("designation", state.designation)
    setValue("companyName", state.companyName)
  }, [state, setValue])

const saveModifiedEmployee = async (modifiedEmp) => {
  try {
    let res = await axios.put(
      `${import.meta.env.VITE_API_URL}/employee-api/employee/${state._id}`,
      modifiedEmp
    );

    if (res.status === 200) {
      alert("Employee details updated successfully");
      navigate("/list");
    }
  } catch (err) {
    alert("Error in updating employee details");
  }
};


  return ( 
    <div>
       <h1 className="text-3xl text-center">Edit Employee</h1>
      {/* form */}
      {/* form.w-full.max-w-md.auto */}
      <form className="max-w-md mt-10 mx-auto" onSubmit={handleSubmit(saveModifiedEmployee)}>
        <input type="text" placeholder='Enter Name' {...register("name")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input disabled type="email" placeholder='Enter Email' {...register("email")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="number" placeholder='Enter Mobile No' {...register("mobile")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="text" placeholder='Enter Designation' {...register("designation")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="text" placeholder='Enter Company Name' {...register("companyName")} id="" className='mb-3 border p-3 w-full rounded-2xl' />


        <button type="submit" className="bg-green-600 text-white block mx-auto p-4">Save</button>
      </form>
    </div>
  )
}

export default EditEmployee