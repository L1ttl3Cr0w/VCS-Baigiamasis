import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

export const userSignup = async (req, res) => {
    try {
      // Apsaugom slaptazodi
      const encryptPwd = await bcrypt.hash(req.body.password, 10);
      console.log(req.body)
  
      // Sukuriame nauja vartotoja su apsaugotu slaptazodziu
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: encryptPwd,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        role: req.body.role
      });
      // Issaugom nauja vartotoja
      user.save();
      res.status(201).json({
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }
export const userLogin = async (req, res) => {
    try {
      // Rasti vartotoja pagal email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }
  
      // Patikriname ar slaptazodis atitinka
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Auth failed' });
      }
  
      // Sukuriame token 2 valandom
      const token = jwt.sign({ email: user.email, userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' }); // Pakankamai laiko atlikt veiksmus, minimaliai data leako
  
      // Atvaizduojame rezultata
      res.status(200).json({
        message: 'Auth successful',
        token: token,
        userId: user._id,
        role: user.role,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  }