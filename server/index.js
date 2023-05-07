const express = require('express')



const app = express()



function main(){

    app.listen('3001' , ()=>{
        console.log("listening in port 3000")
    })

}



main()
