import dotenv from 'dotenv'
dotenv.config()

import api from './api.js'
const port = process.env.PORT




api.listen(port, async() => {
    console.log(`api rodando na porta: ${port}`)
}  )
