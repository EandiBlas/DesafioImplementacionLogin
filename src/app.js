import express from "express";
import handlebars from 'express-handlebars';
import session from "express-session";
import MongoStore from "connect-mongo";

import { Server } from 'socket.io';
import './dao/dbConfig.js'
import { __dirname } from "./utils.js";

import routerV from './routers/views.router.js';
import routerC from './routers/carts.router.js';
import routerP from './routers/products.router.js';
import routerS from './routers/sessions.router.js';

//socketservers
import socketCart from "./listeners/socketCart.js";
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';

const app = express();
const PORT = process.env.PORT || 8080
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views")

app.use(
    session({
        store: new MongoStore({
            mongoUrl: "mongodb+srv://ecommerce:1am1ntAPIj2ZOFzs@cluster0.z7vh8gz.mongodb.net/ecommerce?retryWrites=true&w=majority",
            ttl: 60,
        }),
        secret: "Secret",
        resave: false,
        saveUninitialized: false,
    })
);



app.use('/', routerV);
app.use('/api/carts', routerC)
app.use('/api/products', routerP)
app.use('/api/session', routerS);


const httpServer = app.listen(PORT)

const socketServer = new Server(httpServer)

socketCart(socketServer)
socketProducts(socketServer)
socketChat(socketServer)