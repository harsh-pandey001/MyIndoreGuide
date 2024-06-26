const express = require("express");
const cors = require("cors");
const connectDB = require("./connection/db");
const router = require("./routes/formRoutes");
const app = express();
const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "https://my-indore-guide-fontend.vercel.app", // Allow requests from this origin
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
//     credentials: true 
//   })
// );


// CORS configuration
const corsOptions = {
  origin: 'https://my-indore-guide-fontend.vercel.app', // Allow this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Include credentials if needed
};

// Use CORS middleware
app.use(cors(corsOptions));

// Enable preflight request handling for all routes
app.options('*', cors(corsOptions));

connectDB();


app.use(express.json());
app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/form", (req, res) => {
  res.json("from");
});
// app.options('*', cors({
//   origin: 'https://my-indore-guide-fontend.vercel.app'
// }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://my-indore-guide-fontend.vercel.app");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   next();
// });

app.use("/form/signup", router);
app.use("/form/auth", router);
app.use("/form/data", router);
app.use("/form/email", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
