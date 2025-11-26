import db from '../Config/db.js';


export const getAllProducts = () => {
    return new Promise ((resolve, reject) => {
        db.query("SELECT * FROM products", (err, results) => {  
            if (err) {
                return reject(err);
            }   else {
                return resolve(results);
            }
        });
    });
}



export const insertProduct = (name, price, quantity, image) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO products (name, price, quantity, image) VALUES (?, ?, ?, ?)",
      [name, price, quantity, image],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};


export const findProductById = (id) => {
    return new Promise ((resolve, reject) => {
        db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {   
            if (err) {
                return reject(err);
            }
                else {
                return resolve(results);
            }
        });
    });

}



export const updateQuantity = (id, quantity) => {
    return new Promise ((resolve, reject) => {
        db.query("UPDATE products SET quantity = ? WHERE id = ?", [quantity, id], (err, results) => {
            if (err) {
                return reject(err);
            }

                else {
                return resolve(results);
            }
        });
    });
}

export const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM products WHERE id = ?",
      [id],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
