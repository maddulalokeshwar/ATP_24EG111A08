import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

function ListOfEmps() {
  const [emps, setEmps] = useState([])
  const navigate = useNavigate()

  const gotoEmployee=(empObj)=>{
    //navigate to /employee details page along with selected employee object 
    navigate('/employee', {state:empObj})
  }
  const gotoEditEmployee=(empObj)=>{
    //navigate to /employee details page along with selected employee object 
    navigate('/edit-emp', {state:empObj})
  }
  useEffect(() => {
    async function getEmps(){
      let res=await fetch('http://localhost:6161/employee-api/employee')
      if(res.status === 200){
        let resObj = await res.json()
        setEmps(resObj.payload)
      }
    }
    getEmps()
  }, [])

  const deleteEmp = async (id) => {
  try {
    let res = await fetch(`http://localhost:6161/employee-api/employee/${id}`, {
      method: "DELETE"
    });

    if (res.status === 200) {
      alert("Employee deleted successfully");

      // update UI instantly
      setEmps(emps.filter(emp => emp._id !== id));
    } else {
      alert("Failed to delete employee");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div>
    <h1 className="text-4xl text-center">List of Employees</h1>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {emps.map((empObj) => (
        <div key={empObj._id} className="bg-white p-5 text-center rounded-2xl shadow-2xl">

          <p>{empObj.email}</p>
          <p className="mb-4">{empObj.name}</p>

          <div className="flex justify-around">
            <button 
              onClick={() => gotoEmployee(empObj)} 
              className="bg-green-600 p-2 rounded-2xl text-white"
            >
              View
            </button>

            <button 
              onClick={() => gotoEditEmployee(empObj)} 
              className="bg-blue-600 p-2 rounded-2xl text-white"
            >
              Edit
            </button>

            <button onClick={() => deleteEmp(empObj._id)} className="bg-red-600 p-2 rounded-2xl text-white">
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  </div>
)
}

export default ListOfEmps