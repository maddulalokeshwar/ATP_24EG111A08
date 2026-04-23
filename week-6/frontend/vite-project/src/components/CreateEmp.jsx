import {useForm} from 'react-hook-form'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEmp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const {register, 
        handleSubmit, 
        formState: {errors}
      } = useForm()

      //form submit
      const onFormSubmit = async(newEmpObj) => {
        console.log(newEmpObj)
        //make http post req to backend to save the new employee in db
        try{
          setLoading(true)
          let res=await fetch('http://localhost:6161/employee-api/employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEmpObj)
        });
        if(res.status === 201){
          navigate('/list')
        }else{
          let errorRes = await res.json()
          console.log(errorRes)
          throw new Error(errorRes.reason)
        }
      }
        catch(err){
          setError(err.message)
        }
        finally{
          setLoading(false)
        }
      }
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


