import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc} from "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "react-coderhouse-f9aa5.firebaseapp.com",
    projectId: "react-coderhouse-f9aa5",
    storageBucket: "react-coderhouse-f9aa5.appspot.com",
    messagingSenderId: "808672624909",
    appId: "1:808672624909:web:588dc60c86b50a8be5f044"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore()

const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db, "productos"), {
            nombre: prod.nombre,
            marca: prod.marca,
            idCategoria: prod.idCategoria,
            stock: prod.stock,
            precio: prod.precio,
            img: prod.img
        })
    })
}


//GET PRODUCTOS (ItemListContainer) FIREBASE
const getProductos = async() => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {return {...prod.data(), id: prod.id}})
    return items
}
//GET PRODUCTO (ItemDetailContainer) FIREBASE
const getProducto = async (id) => {
    const prod = await getDoc(doc(db, "productos",id))
    const item = {...prod.data(), id: prod.id}
    return item
}

//CREATE PRODUCTOS
const createProducto = async (objProducto) => {
    const estado = await addDoc(collection(db, "productos"), {
             nombre: objProducto.nombre,
             marca: objProducto.marca,
             modelo: objProducto.modelo,
             idCategoria: objProducto.idCategoria,
             stock: objProducto.stock,
             precio: objProducto.precio,
             img: objProducto.img
         })
 
         return estado
 }

//UPDATE producto

const updateProducto = async(id, info) => {
    const estado = await updateDoc(doc(db, "productos",id), info)
    return estado
}

//DELETE producto

const deleteProducto = async(id) => {
    const estado = await deleteDoc(doc(db, "productos", id))
    return estado
}

//CREATE AND READ ordenes de compra

const createOrdenCompra = async (cliente, preTotal) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"), {
             nombre: cliente.nombre,
             apellido: cliente.apellido,
             email: cliente.email,
             dni: cliente.dni,
             direccion: cliente.direccion,
             precioTotal: preTotal,
          
         })
 
         return ordenCompra
 }

 const getOrdenCompra = async(id) => {
    const item = await getDoc(doc(db, "ordenCompra", id))
    const ordenCompra = {...item.data(), id: item.id}
    return ordenCompra
 }


export {cargarBDD, getProductos, getProducto, createProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra}

