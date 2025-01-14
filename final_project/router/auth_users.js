const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

const users = [{"username":"sknavaz","password":"pass"}];

// const isValid = (username)=>{ //returns boolean
// //write code to check is the username is valid
//   return username && username.trim().length > 0;
// }

const isValid = (username)=>{ //returns boolean
  //write code to check is the username is valid
  //console.log(username);
  const isUserPresent = users.some(obj => Object.values(obj).includes(username));
  return isUserPresent;
    //return username && username.trim().length > 0;
  }
  

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  const user = users.find(u => u.username === username && u.password === password);
  return !!user;
}


// regd_users.post("/Newregister", (req,res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }
//   if (users.find((user) => user.username === username)) {
//     return res.status(409).json({ message: "Username already exists" });
//   }
//   users.push({ username, password });
//   return res.status(201).json({ message: "User registered successfully" });
// });

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body;
  
  // check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({message: "Please provide both username and password."});
  }

  // check if user is registered
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({message: "Invalid credentials."});
  }

  // check if password is correct
  if (user.password !== password) {
    return res.status(401).json({message: "Invalid credentials."});
  }

  // generate JWT token
  const accessToken = jwt.sign({ username: user.username }, 'your_secret_key');

  // save token in session
  req.session.accessToken = accessToken;

  // return success message with access token
  return res.json({message: "Login successful.", accessToken});
});

 
 
 

regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.username;
  const isbn = req.params.isbn;
  const review = req.query.review;
  console.log(username);
  if (!review) {
    return res.status(400).json({message: "Please provide a review"});
  }
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }
  if (books[isbn].reviews[username]) {
    books[isbn].reviews[username] = review;
    return res.json({message: "Review modified successfully"});
  }
  books[isbn].reviews[username] = review;
  return res.json({message: `Your review ${review} for the book isbn  ${isbn} added successfully`});
});

// // Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   const { review } = req.query;
//   const { isbn } = req.params;
//   const username = req.session.username;
//   //res.send("user is "+ username );

//   if (!review) {
//     return res.status(400).json({ message: "Review is required" });
//   }

//   if (!username) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   if (!books[isbn]) {
//     return res.status(404).json({ message: "Book not found" });
//   }

//   if (!books[isbn].reviews) {
//     books[isbn].reviews = {};
//   }

//   books[isbn].reviews[username] = review;

//   return res.status(200).json({ message: "Review added/modified successfully" });
// });


// Add a book review
// regd_users.put("/auth/review/:isbn", (req, res) => {
//   //Write your code here
//   return res.status(300).json({message: "Yet to be implemented"});
// });

// regd_users.post("/Newregister", (req,res) => {
//   //Write your code here
//   // const username = req.body.username;
//   // res.send(username);
//   const { username, password } = req.body;
//   //console.log(username);

//     // Check if username and password are provided
//     if (!username || !password) {
//         return res.status(400).json({ message: "Please provide username and password" });
//     }

//     // Check if username already exists
//     if (users[username]) {
//         return res.status(400).json({ message: "Username already exists" });
//     }

//     // Add the new user to the users object
//     users[username] = password;

//     return res.status(200).json({ message: "User registered successfully" });
// });

// regd_users.post("/Newregister", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password are required" });
//   }
//   if (!isValid(username, password)) {
//     return res.status(400).json({ message: "Username already exists" });
//   }
//   users.push({ username, password });
//   return res.status(200).json({ message: "User registered successfully" });
// });


// regd_users.post("/users", (req, res) => {
//   const user = req.body.username;
//   const newUser = users[user];
//   res.send("USer is "+ newUser);
// });

// regd_users.get("/users", (req, res) => {
//   res.send(users);
// });

//Delete a book review

// regd_users.delete("/auth/review/:isbn", (req, res) => {
//   const isbn = req.params.isbn;
//   const username = req.session.username;
//   const user = req.body.username;
//   console.log(isbn);

//   if (!username) {
//     return res.status(401).json({message: "Unauthorized"});
//   }

//   if (!isValid(username)) {
//     return res.status(401).json({message: "Invalid username"});
//   }

//   if (!books[isbn]) {
//     return res.status(400).json({message: "Invalid ISBN"});
//   }

//   if (!books[isbn].reviews[username]) {
//     return res.status(400).json({message: "Review not found for the given ISBN and username"});
//   }

//   delete books[isbn].reviews;
//   return res.status(200).json({message: "Review deleted successfully"});
// });


regd_users.delete("/auth/review/:isbn", (req, res) => {
  // const isbn = req.params.isbn;
  // const username = req.session.username;
  
  // if (!username) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // if (!books[isbn]) {
  //   return res.status(404).json({ message: "Book not found" });
  // }

  // const review = books[isbn].reviews[username];

  // if (!review) {
  //   return res.status(404).json({ message: "Review not found" });
  // }

  // delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted successfully" });
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;