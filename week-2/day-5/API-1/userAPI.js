//Create mini express modules(Sepreate route)
import exp from'express'
export const userApp=exp.Router()

let users = []

userApp.get('/users', (req, res) => {
  res.json({ message: "all users", payload: users })
})

userApp.post('/users', (req, res) => {
  const newUser = req.body
  users.push(newUser)
  res.json({ message: "User created" })
})

userApp.put('/users', (req, res) => {
  let modUser = req.body
  let index = users.findIndex(userObj => userObj.id === modUser.id)

  if (index == -1)
    return res.json({ message: "User not found" })

  users.splice(index, 1, modUser)
  res.json({ message: "User updated successfully" })
})

userApp.delete('/users/:id', (req, res) => {
  let iDOfUrl = Number(req.params.id)
  let index = users.findIndex(userObj => userObj.id === iDOfUrl)

  if (index === -1)
    return res.json({ message: "Sorry,user not found" })

  users.splice(index, 1)
  res.json({ message: "User is deleted successfully" })
})

userApp.get('/users/:id', (req, res) => {
  let iDOfUrl = Number(req.params.id)
  let index = users.findIndex(userObj => userObj.id === iDOfUrl)

  if (index === -1)
    return res.json({ message: "Sorry,user not found" })

  res.json({ message: "User data:", payload: users[index] })
})