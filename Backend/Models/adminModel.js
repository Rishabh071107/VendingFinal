import db from '../Config/db.js';


export const getAdminByemail = (email) => {

  return new Promise ((resolve, reject) => {    
    db.query("SELECT * FROM admins WHERE email = ?", [email], (err, results) => {
      if (err) {
        return reject(err);
      }     else {
        return resolve(results);
      }                                         
    });
  });

}





export const  insertAdmin = (Data)  =>   {
    return new Promise ((resolve, reject) => {
        db.query("INSERT INTO admins SET ?", Data, (err, results) => {  
            if (err) {
                return reject(err);
            }   
            else {          
                return resolve(results);
            } 
        });
    });
}