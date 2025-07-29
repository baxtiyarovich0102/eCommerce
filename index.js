import express from "express"
import {create} from "express-handlebars"
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"


const app =express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
}) 

app.engine("hbs", hbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(AuthRoutes)
app.use(ProductsRoutes)

const PORT = process.env.PORT || 4000
app.listen(4000, () => { console.log("Server is running", PORT);
})