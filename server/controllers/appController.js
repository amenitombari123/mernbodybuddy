import UserModel from '../model/User.model.js'
import Feedback from "../model/feedback.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
//import mongoose from 'mongoose'; // Import Mongoose
import otpGenerator from 'otp-generator'

/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


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

// appController.js
// ...

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    bcrypt.compare(password, user.password).then((passwordCheck) => {
      if (!passwordCheck) {
        return res.status(400).send({ error: "Password does not match" });
      }

      // Retrieve user's weight entries
      const { password: _, weights, ...rest } = user.toJSON();

      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        ENV.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).send({
        msg: "Login Successful...!",
        username: user.username,
        token,
        weights,
        ...rest,
      });
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */

export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(400).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username }).exec();

    if (!user) return res.status(404).send({ error: "User Not Found" });

    // Remove password from user
    const { password, ...rest } = user.toJSON();

    return res.status(200).send(rest);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
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
//mongoose.set("debug", true);
export async function updateUser(req, res) {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).send({ error: "Missing ID in the request query." });
    }

    const body = req.body;

    // Use async/await with findOneAndUpdate
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).send({ msg: "Record Updated...!" });
    } else {
      return res.status(404).send({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}



/** GET: http://localhost:8080/api/generateOTP */

export async function generateOTP(req,res){
  req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  res.status(201).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
  const { code } = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify Successsfully!'})
  }
  return res.status(400).send({ error: "Invalid OTP"});
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
  if(req.app.locals.resetSession){
       return res.status(201).send({ flag : req.app.locals.resetSession})
  }
  return res.status(440).send({error : "Session expired!"})
}
// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */


export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: "Session expired!" });
    }

    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

      req.app.locals.resetSession = false; // Reset session

      return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      return res.status(500).send({ error: "An error occurred while updating the record" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** POST: http://localhost:8080/api/feedback */
export async function submitFeedback(req, res) {
  try {
    const { shortFeedback, longFeedback } = req.body;

    if (!shortFeedback || !longFeedback) {
      return res.status(400).send({ error: "Both shortFeedback and longFeedback are required" });
    }

    const feedback = new Feedback({
      shortFeedback,
      longFeedback,
    });

    const result = await feedback.save();

    res.status(201).send({ msg: "Feedback Submitted Successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

/** GET: http://localhost:8080/api/feedback */
export async function getAllFeedback(req, res) {
  try {
    const allFeedback = await Feedback.find();
    res.status(200).send(allFeedback);
  } catch (error) {
    res.status(500).send({ error: "Error retrieving feedback" });
  }
}

// POST : http://localhost:8080/api/addWeight
export async function addWeight(req, res) {
  try {
    const { username, weight, date } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.weights.push({ weight, date });
    await user.save();

    res.status(201).send({ msg: "Weight entry added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
}