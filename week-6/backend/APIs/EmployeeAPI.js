import exp from "express"
import {EmployeeModel} from "../models/EmployeeModel.js"
import {config} from "dotenv"
export const employeeApp = exp.Router()
config()

//Create employee 
employeeApp.post("/employee", async(req, res, next)=>{
    const newEmp = req.body;
    const newEmpDoc = new EmployeeModel(newEmp);
    await newEmpDoc.save()
    res.status(201).json({message: "Employee created successfully", employee: newEmpDoc})
})

//Read All Employees in db
employeeApp.get("/employee", async(req, res, next)=>{
    const employees = await EmployeeModel.find()
    res.status(200).json({message: "Employees retrieved successfully", payload:employees})
})

employeeApp.put("/employee/:id", async (req, res) => {
  const empId = req.params.id;

  const updatedEmpDoc = await EmployeeModel.findByIdAndUpdate(
    empId,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (updatedEmpDoc) {
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmpDoc
    });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

//Delete Employee
employeeApp.delete("/employee/:id", async(req, res)=>{
    const empId = req.params.id
    const deletedEmpDoc = await EmployeeModel.findByIdAndDelete(empId)
    if(deletedEmpDoc){
        res.status(200).json({message: "Employee deleted successfully", employee: deletedEmpDoc})
    } else {
        res.status(404).json({message: `Employee with ID ${empId} not found`})
    }
})