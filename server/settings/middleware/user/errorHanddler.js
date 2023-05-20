// manejador de errores de la url 
const notFount = (req, res, next) => {
    const error = new Error(`NOT FOUND- ${req.originalUrl}`)
    res.status(404)
    next(error)
}
// manejador de error en envio de datos a la base de datos
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: err.message,  
    })
}

module.exports = { 
    notFount,
    errorHandler
}