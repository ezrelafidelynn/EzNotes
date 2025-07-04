//global import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

//local import
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();




if(process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: ["http://localhost:5173"],
        }
        )
    );
}

//middleware
app.use(express.json());
app.use(rateLimiter);

// app.use((req,res,next) =>{
//     console.log("We just got a new request");
//     next();
// })

app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
})
