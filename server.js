const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();
const path = require("path");
const hbs = require("hbs");

// Middlewares
const logLoginActivityMiddleware = require("./middlewares/logLoginActivityMiddlewares");

// Routes
const loginRoutes = require("./routes/loginRoutes");
const signupRoutes = require("./routes/signupRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const venueRoutes = require("./routes/venueRoutes");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/nodeAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Session Configuration
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Set up views and static files
const templatesPath = path.join(__dirname, "templates");
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", templatesPath);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/", bookingRoutes);
app.use("/", venueRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
