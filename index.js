const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');


const email = "freelancer@gmail.com";
const password = "1234";

app.listen(port, () => {
  console.log(`Server has start at http://localhost: ${port}`)
})

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.set("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({name: "Mostafiz", userName: "Mostafiz123456"}));
});

app.post('/login', (req, res) => {
  if(req.body.email === email && req.body.password === password){
    res.status(200).send(JSON.stringify({status: true, message: "Login Successfull --- waiting..." }));
    
  }else{
    res.status(200).send(JSON.stringify({status: false, message: "Invalid UserName or password" }));
  }

});


/// ekhane pool connection use kora hoyse
// wahat is pool connection---------------------
// pool connection holo ata ekbar connect korle multiple time use kra jai

const mysql = require ('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'testadmin',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// async function query(query){  // data call or etc er somooy amara query use korbo ------- ekhane query use kora hoyse ata te ja dibo tai database a chole jabe
//   try {
//     // For pool initialization, see above
//     const [rows, fields] = await pool.query(query);
//     // Connection is automatically released when query resolves
//     return rows;
    
//   } catch (err) {
//     return err
//   }
// }
async function prepare(query, arr){  // data insert korar somoy amra prepared use korbo 
  try {
    // For pool initialization, see above
    const [rows, fields] = await pool.execute(query, arr); // kono hacker er kono command jno kaj na kre sei jonno exiscute use korte bola hoyse
    // Connection is automatically released when query resolves
    return rows;
    
  } catch (err) {
    return err
  }
}

// query(`SELECT * FROM Users WHERE email="Sakib@gmail.com"`) /// query use korra hoyse
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
  
// });


// prepare(`SELECT * FROM Users WHERE id=?`, [2]) // value gula a vabe dile mySql ata check kore j kono hackerr kono command dise naki 
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
  
// });

// ************************* when we are useing prepared statement and when we are useing prepared statement
// ****************** amara jokhon data pathabo tokhon prepare use korbno 
// ****************** amara jokhon data anbo or kothau show korabo tokhon prepare use korbno 

prepare("INSERT INTO Users (fullName, email, password)VALUES(?, ?, ?)", [
  "Md Mostafiz", "freelancer@gmail.com", "free1234"
]).then((data) => {
  console.log(data);
}).catch((err) => {
  console.log(err);
  
});