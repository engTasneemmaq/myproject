'use strict';
const {Users} = require("../module/index");
const base64 = require('base-64');


async function basicAuth(req,res,next){
  if(req.headers.authorization){
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  // console.log(basicHeaderParts);
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"          
  let [username, password] = decodedString.split(':'); // username, password
  Users.authenticateBasic(username, password)
  .then((validUser) => {
    console.log(validUser);
      req.user = validUser;
      // console.log('/////////////////////////', req.user)
      next();
  })
  .catch((err) => {
      res.status(403);
      res.send("Invalid Signin");
  })
}
}

module.exports=basicAuth; 