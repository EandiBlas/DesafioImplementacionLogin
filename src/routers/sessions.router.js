import { Router } from 'express';
import userModel from '../dao/models/user.model.js';


const routerS = Router()

routerS.get('/'), async (req, res) => {
    res.redirect('/register');
}

routerS.post('/register', async (req, res) => {

    const { first_name, last_name, email, age, password } = req.body;

    const existUser = await userModel.findOne({ email })
    if (existUser) {
        return res.send({ message: "El usuario ya esta registrado" })
    }
    const user = {
        first_name, last_name, email, age, password
    };
    const createUser = await userModel.create(user)
    res.send({ message: "Nuevo usuario registrado" });

})

routerS.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password })
    const isAdmin = email === 'adminCoder@coder.com' && password === 'adminCod3r123'

    if(!isAdmin && !user){
        return res.status(400).send({ status: "error", error: "Credenciales incorrectas" })
    }

    req.session.user = {
        name: isAdmin ? 'Admininistrador' : `${user.first_name} ${user.last_name}`,
        email: isAdmin ? email : user.email,
        age: isAdmin ? null : user.age,
        role: isAdmin ? 'admin' : 'user'
    }

    res.send({ message: "User Logueado", payload: req.res.user })

})

routerS.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "No pudo cerrar sesion" })
        res.redirect('/login');
    })
})


export default routerS