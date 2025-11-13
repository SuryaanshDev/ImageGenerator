import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import razorpay from 'razorpay'
import transactionModel from '../models/transactionModel.js'
import crypto from 'crypto'


const registerUser = async (req, res)=> {

    try {
       
        const {name, email, password} = req.body;

        if (!name || !email || !password) {

            return res.json({success: false, message: 'Missing Details'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {

            name,
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        
        res.json({success: true, token, user: {name: user.name}});
    } catch (error) {
        
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const loginUser = async (req, res)=> {

    try {
       
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if (!user) {
            
            return res.json({success: false, message: 'User does not exist'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

            res.json({success: true, token, user: {name: user.name}});
        }
        else {

            return res.json({success: false, message: 'Invalid Credentials'});
        }

    } catch (error) {
        
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const userCredits = async(req, res)=> {

    try {
    
        const userId = req.userId;
        const user = await userModel.findById(userId);

        res.json({success: true, credits: user.creditBalance, user: {name: user.name}});
    } catch (error) {
        
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

const razorpayInstance = new razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async(req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.userId; // Get from auth middleware
        
        const user = await userModel.findById(userId);
        if (!user || !planId) {
            return res.json({ success: false, message: "Missing Details" });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.json({ success: false, message: 'Plan not found!' });
        }

        const transactionData = {
            userId, plan, amount, credits, date: Date.now()
        }

        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY || 'INR',
            receipt: newTransaction._id.toString(),
        }

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyRazorpay = async (req, res)=> {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.json({ success: false, message: "Missing payment details" });
        }

        // Verify payment signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.json({ success: false, message: "Payment verification failed" });
        }

        // Fetch order details
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (!transactionData) {
                return res.json({ success: false, message: 'Transaction not found' });
            }

            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already processed' });
            }

            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.json({ success: false, message: 'User not found' });
            }

            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { 
                payment: true,
                razorpay_payment_id,
                razorpay_order_id 
            });

            res.json({ 
                success: true, 
                message: "Credits Added Successfully",
                newBalance: creditBalance 
            });
        } else {
            res.json({ success: false, message: "Payment not completed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export{registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay};