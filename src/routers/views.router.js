import { Router } from 'express';
import ProductManager from "../dao/managers/productManagerMongo.js"
const pm = new ProductManager()

const routerV = Router()

const publicAcces = (req,res,next) =>{
    if(req.session.user) return res.redirect('/profile');
    next();
}

const privateAcces = (req,res,next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
}

routerV.get("/", async (req, res) => {
    res.render('register', {
        style: 'styles.css'
    })
    // const listadeproductos = await pm.getProductsView()
    // res.render("home", { listadeproductos })
})

routerV.get("/products", async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("products", { listadeproductos, style: 'styles.css' })
})

routerV.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts", {style: 'styles.css'})
})

routerV.get("/chat", (req, res) => {
    res.render("chat",{style:'chat.css'})
})

routerV.get("/register", publicAcces, (req,res)=>{
    res.render("register",{style: 'styles.css'})
})

routerV.get("/login", publicAcces, (req,res)=>{
    res.render("login",{style: 'styles.css'})
})

routerV.get("/profile", privateAcces ,(req,res)=>{
    res.render("profile",{user: req.session.user, style: 'styles.css'})
})


export default routerV