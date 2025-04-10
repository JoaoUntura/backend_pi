import db from "../config/database.js";
import csv from 'csv-parser';
import fs from 'fs';

 class Produto{

    async findAll(){
        try {
            const produtos = await db.select("id","nome","preco").table('Produto')
            return {validated: true, values:produtos}
        } catch (error) {
            return {validated: false, error: error}
        }
           }


    async findById(id){
        try{

            const produto = await db.select("id","nome","preco").where("id", id).table('Produto')
            return produto.length > 0 
            ?{validated:true, values:produto}
            :{validated:true, values:undefined}

        }catch(error){
            return {validated: false, error: error}
        }
    }

    async create(nome, preco){
        try{
            await db.insert({nome:nome, preco:preco}).table("Produto")
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
                preco: parseFloat(data.preco)
            };
            results.push(newData); // cada `data` é um objeto com as colunas do CSV
          })
          .on('end', async () => {
        
              
              await db('Produto').insert(results);
      
              
              fs.unlinkSync(file);
      
            
          });
          
          return {validated: true, values: results}
        }catch (err) {
            return {validated: false, err: err.message}
        }
    }

}   

export default new Produto()