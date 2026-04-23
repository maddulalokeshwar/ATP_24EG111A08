import {useLocation} from "react-router-dom"

function Employee() {
  //read state received in navigation 
  const {state} = useLocation()


  return (
    <div>Employee
      <div className="p-16 text-center text-3xl">
        <p>{state.name}</p>
        <p>{state.email}</p>
        <p>{state.mobile}</p>
        <p>{state.designation}</p>
        <p>{state.companyName}</p>
      </div>
    </div>
  )
}

export default Employee