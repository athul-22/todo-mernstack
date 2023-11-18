import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import { hashString } from "./index.js";
// import Verification from '../models/emailVerification.js'
// import PasswordReset from '../models/passwordReset.js'

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

const sentWelcomeEmail = async (newUser, res) => {
    const { email, name } = newUser;

    console.log(email);
    console.log(name);

    //   mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Welcome to todo ai",
        html: `<div style='font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px;'>
        <h3 style="color: #1890ff; ">Github repo link below</h3>
        <hr>
        <h4>Hi ${name} 👋 </h4>
        <p>
            <a href="https://github.com/athul-22/todo-mernstack" style="color: #fff; padding: 14px; text-decoration: none; background-color: #1890ff; border-radius: 8px; font-size: 18px;box-shadow:#1890ff 0px 4px 16px 0px;">
                VISIT GITHUB REPO
            </a>
        </p>
        <div style="margin-top: 20px;">
          
        </div>
    </div>`,
    };

    // try {
    //     transporter
    //         .sendMail(mailOptions)
    //         .then(() => {
    //             console.log("mail sent successfully")
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");
        
    } catch (error) {
        console.log("Error sending mail:", error);
       
    }

}

export default sentWelcomeEmail;
