import bcrypt from 'bcrypt'

export default function hashPasswordService(password){
    let salt = bcrypt.genSaltSync(10)
    let passHash = bcrypt.hashSync(password, salt)
    
    return passHash

}
