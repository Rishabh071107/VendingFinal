import bcrypt from 'bcryptjs';
import  {generateToken} from '../Utils/generateToken.js';
import { getUserByEmail} from '../Models/userModel.js';
import { insertUser } from '../Models/userModel.js';


export const userSignup = async (req, res) => {
    try{
    const { name, email, password } = req.body;
    const exists = await getUserByEmail(email);
    if(exists.length >0){
        return res.status(400).json({ message: 'User already exists' });
    }
        else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await insertUser({ name, email, password: hashedPassword });
        const token = generateToken({ id: result.insertId, role: 'user' });
        return res.status(201).json({ message: 'User created successfully', token });
     }
    }
        catch (error) { 
        return res.status(500).json({ message: 'Server error', error: error.message });

     }
    }
    export const userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (user.length ===0){
            return res.status(400).json({ message: 'User not found ' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        if (isPasswordCorrect) {
            const token = generateToken({ id: user[0].id, role: 'user' });
            return res.status(200).json({ message: 'Login successful', token });
        }
        if(!isPasswordCorrect){
            return res.status(400).json({ message: 'Invalid password' });

    }
}   catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
