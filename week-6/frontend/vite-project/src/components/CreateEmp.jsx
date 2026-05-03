import {useForm} from 'react-hook-form'
import {useState} from 'react'
import { useNavigate } from 'react-router'

function CreateEmp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const {register, 
        handleSubmit, 
        formState: {errors}
      } = useForm()

      //form submit
     const onFormSubmit = async (newEmpObj) => {
  console.log("SENDING:", newEmpObj);

  try {
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/employee-api/employee`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmpObj)
      }
    );

    console.log("STATUS:", res.status);
    console.log("OK:", res.ok);

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    if (res.ok) {
      navigate("/list");
    } else {
      throw new Error(text || "Server error");
    }

  } catch (err) {
    console.log("ERROR CAUGHT:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
      console.log(errors)
      if(loading){
        return <h1 className="text-3xl text-center">Loading...</h1>
      }
      if(error){
        return <h1 className="text-3xl text-center text-red-500">{error}</h1>
      }


  return (
    <div>
      <h1 className='text-3xl text-center'>Create Employee</h1>
      {/* form */}
      {/* form.w-full.max-w-md.auto */}
      <form className="max-w-md mt-10 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" placeholder='Enter Name' {...register("name")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="email" placeholder='Enter Email' {...register("email")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="number" placeholder='Enter Mobile No' {...register("mobile")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="text" placeholder='Enter Designation' {...register("designation")} id="" className='mb-3 border p-3 w-full rounded-2xl' />
        <input type="text" placeholder='Enter Company Name' {...register("companyName")} id="" className='mb-3 border p-3 w-full rounded-2xl' />


        <button type="submit" className="bg-gray-600 text-white block mx-auto p-4">Submit</button>
      </form>
    </div>
  )
}

export default CreateEmp



/*
import {useForm} from 'react-hook-form'
function CreateEmp() {
  const {register, handleSubmit,formState:{errors}} = useForm()
  return (
    <div>
      <h1 className='text-5xl text-center text-gray-300 '>Create New Employee</h1>
      {/* Form }
      <form className='w-full max-w-md mx-auto mt-7'>
        <input type="text" placeholder='Enter name' {...register("name")} id=""  className='mb-3 border p-3 w-full rounded-2xl'/>
         <input type="email" placeholder='Enter Email' {...register("email")} id=""  className='mb-3 border p-3 w-full rounded-2xl'/>
          <input type="" placeholder='Enter Mobile No' {...register("mobile")} id=""  className='mb-3 border p-3 w-full rounded-2xl'/>
           <input type="text" placeholder='Enter Company Name' {...register("name")} id=""  className='mb-3 border p-3 w-full rounded-2xl'/>
      </form>
    </div>
  )
}

export default CreateEmp
*/