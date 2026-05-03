import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/userAPI.js'
import { authorApp } from './APIs/authorAPI.js'
import { adminApp } from './APIs/adminAPI.js'
import { commonApp } from './APIs/commonAPI.js'
import cookieParser from 'cookie-parser'
config()
import cors from "cors";



const app = exp()
const port = process.env.PORT || 4000
app.use(cors({
  origin: "*"
}))
app.use(exp.json())
app.use(cookieParser())
app.use("/user-api", userApp)
app.use("/author-api", authorApp)
app.use("/admin-api", adminApp)
app.use("/auth", commonApp)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});
async function connectDB() {
  try {
    console.log("DB URL:", process.env.DB_URL); // debug

    if (!process.env.DB_URL) {
      throw new Error("DB_URL missing in Render environment");
    }

    await connect(process.env.DB_URL);

    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.log("DB ERROR:", err.message);
    process.exit(1);
  }
}

connectDB()