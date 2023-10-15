import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}*/
export async function register(req, res) {
    try {
      const { username, password, profile, email } = req.body;
  
      // Check for the existing user
      const existUsername = UserModel.findOne({ username }).exec();
  
      // Check for the existing email
      const existEmail = UserModel.findOne({ email }).exec();
  
      const [existingUsername, existingEmail] = await Promise.all([
        existUsername,
        existEmail,
      ]);
  
      if (existingUsername) {
        return res.status(400).send({ error: "Please use a unique username" });
      }
  
      if (existingEmail) {
        return res.status(400).send({ error: "Please use a unique email" });
      }
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const user = new UserModel({
          username,
          password: hashedPassword,
          profile: profile || "",
          email,
        });
  
        const result = await user.save();
  
        res.status(201).send({ msg: "User Registered Successfully" });
      } else {
        res.status(400).send({ error: "Password is required" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

export async function login(req,res){
   
    res.json('login route');
       
}

/** GET: http://localhost:8080/api/user/example123 */

export async function getUser(req,res){
   
    res.json('getUser route');
       
}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/

export async function updateUser(req,res){
   
    res.json('updateUser route');
       
}

/** GET: http://localhost:8080/api/generateOTP */

export async function generateOTP(req,res){
   
    res.json('generateOTP route');
       
}

/** GET: http://localhost:8080/api/verifyOTP */

export async function verifyOTP(req,res){
   
    res.json('verifyOTP route');
       
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */

export async function createResetSession(req,res){
   
    res.json('createResetSession route');
       
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */

export async function resetPassword(req,res){
   
    res.json('resetPassword route');
       
}
