import db from '../Config/db.js';


export const getUserByEmail = (email) => {

  return new Promise ((resolve, reject) => { 
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        return reject(err);
        }     else {    
                
        return resolve(results);
        }
    });
    });
}


export const insertUser = (Data) => {
    return new Promise ((resolve, reject) => {
        db.query("INSERT INTO users SET ?", Data, (err, results) => {  
            if (err) { 
                return reject(err);
            }   else {
                return resolve(results);
            }
        });
});
}
                 
