// generamos token para autenticar usuario 
const generarIdToken = () => {
    const random = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)

    return random + fecha;
}  

module.exports = generarIdToken