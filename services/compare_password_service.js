//requerer o bcrypt
import bcrypt from "bcrypt"

export default function comparePasswordService(password, user_password){
    let isPassword = bcrypt.compareSync(password, user_password)
    return isPassword
}

