import express from "express"
const app = express();
const PORT = 3333;
import { connectDB } from "./connection.js";
import foodRoute from "./routes/food_items.js";
import userRoute from "./routes/CreateUser.js"
import categoryRoute from "./routes/food_category.js"
import orderRoute from "./routes/OrderData.js"
import cors from "cors";

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})



connectDB();

app.use(express.json());
app.use(cors());



app.use("/api/v1/food", foodRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/order", orderRoute);



app.listen(PORT, ()=>{
    console.log(`http://localhost/${PORT}`);
})