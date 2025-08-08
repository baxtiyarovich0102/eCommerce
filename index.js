import express from "express"
import {create} from "express-handlebars"
import mongoose from "mongoose"
import * as dotenv from "dotenv"
import varMiddleware from "./middleware/var.js"
import session from "express-session" 
import cookieParser from "cookie-parser"
import flash from "connect-flash"

import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"

dotenv.config()

const app =express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
}) 

app.engine("hbs", hbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({secret: "SECRET", resave: false, saveUninitialized: false}))
app.use(flash())
app.use(varMiddleware)


app.use(AuthRoutes)
app.use(ProductsRoutes)



const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB ga ulandi");

    app.listen(PORT, () => {
      console.log("Server is running on", PORT);
    });
  } catch (err) {
    console.error("MongoDB ga ulanishda xato:", err);
    process.exit(1);
  }
};

start();