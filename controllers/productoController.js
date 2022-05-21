const Producto = require("../models/Producto");

const options = {
    page: 1,
    limit: 10
}

exports.crearProducto = async (req, res) => {
   
    try {
        let producto;
        producto = new Producto(req.body)

        await producto.save();

        res.send(producto);
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}
exports.obtenerProductos = async (req, res) => {
   
    try {
        const limit = req.query.limit;
        const page = req.query.page;
        const productos = await Producto.paginate({},{limit, page})
        res.json(productos)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}
exports.actualizarProducto = async (req, res) => {
   
    try {

        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ message:"este producto no existe"})
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({_id: req.params.id}, producto, {new : true});
        res.json(producto);


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}
exports.obtenerProducto = async (req, res) => {
   
    try {
        let producto = await Producto.findById(req.params.id);
        
        if (!producto) {
            res.status(404).json({ message:"este producto no existe"})
        }
        res.json(producto);


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}
exports.eliminarProducto = async (req, res) => {
   
    try {
        let producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.status(404).json({ message:"este producto no existe"})
        }
        await Producto.findOneAndRemove({_id: req.params.id})
        res.json({message: "Producto eliminado con exito"});


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }

}