import db from "../config/database.js";
import csv from 'csv-parser';
import fs from 'fs';

 class Cliente{

    async findAll(){
        try {
            const cliente = await db.select("id","nome", "contato").table("Cliente")
            return {validated: true, values:cliente}
        } catch (error) {
            return {validated: false, error: error}
        }
           }


    async findById(id){
        try{

            const cliente = await db.select("id","nome", "contato").where("id", id).table("Cliente")
            return cliente.length > 0 
            ?{validated:true, values:cliente}
            :{validated:true, values:undefined}

        }catch(error){
            return {validated: false, error: error}
        }
    }

    async create(nome, contato){
        try{
            await db.insert({nome:nome, contato:contato}).table("Cliente")
            return {validated:true}
        }catch(error){
            return {validated: false, error: error}
        }
    }

    async insertViaCsv(file){
   
        const results = [];
        try{

        fs.createReadStream(file)
          .pipe(csv())
          .on('data', (data) => {
            const newData = {
                nome: data.nome,
                contato: data.contato
            };
            results.push(newData); // cada `data` é um objeto com as colunas do CSV
          })
          .on('end', async () => {
              await db('Cliente').insert(results);
              fs.unlinkSync(file);
          });
          
          return {validated: true}
        }catch (err) {
            return {validated: false, err: err.message}
        }
    }


}


export default new Cliente