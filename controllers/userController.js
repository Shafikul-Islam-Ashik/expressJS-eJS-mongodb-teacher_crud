import fs from "fs";
import { getProductSlug } from "../helpers/helpers.js";
import nodemailer from "nodemailer";
import axios from "axios";
import User from "../models/User.js";

// show all user page
export const showUserPage = async (req, res) => {
  // get data from db
  const usersData = await User.find();

  res.render("users", {
    users: usersData,
  });
};

// show create user page
export const showCreateUserPage = (req, res) => {
  res.render("create");
};

// show edit user page
export const showEditUserPage = async (req, res) => {
  const { id } = req.params;

  // get data from db
  // const singleUser = await User.findOne({ _id: id });
  const singleUser = await User.findById(id);

  res.render("edit", {
    singleUser,
  });
};

// show single user page
export const showSingleUserPage = async (req, res) => {
  const { slug } = req.params;

  // get data from db
  const singleUser = await User.findOne({ slug: slug });

  res.render("singleUserpage", {
    singleUser,
  });
};

// create user  async
export const createUser = async (req, res) => {
  // destructure
  const { f_name, l_name, age, address, gender, phone, email } = req.body;
  const fullName = f_name + " " + l_name;

  //  const slug = getProductSlug(fullName)

  /**
   * send email
   */

  //create mail transport
  // const transport = nodemailer.createTransport({
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //   auth: {
  //     user: process.env.MAIL_ADDRESS,
  //     pass: process.env.MAIL_PASS,
  //   },
  // });

  //sending email
  // await transport.sendMail({
  //   from: `Ashik Group <${process.env.MAIL_ADDRESS}>`,
  //   subject: "Email for Welcome",
  //   to: email,
  //   html: `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="UTF-8" />
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //       <title>email template</title>
  //       <style>
  //         body {
  //           margin: 0;
  //           padding: 0;

  //           box-sizing: border-box;
  //           height: 100vh;
  //           background-color: #dddcdc;
  //         }
  //         .container {
  //           width: 60%;
  //           margin: 50px auto;
  //         }
  //         .mail-head {
  //           text-align: center;
  //         }
  //         .mail-head img {
  //           width: 100px;
  //         }
  //         .mail-body {
  //           background-color: #fff;
  //           padding: 15px;
  //         }
  //         .mail-body img {
  //           width: 100%;
  //         }
  //       </style>
  //     </head>
  //     <body>
  //       <div class="container">
  //         <div class="mail-head">
  //           <img
  //             src="https://cutewallpaper.org/24/react-logo-png/react-js-logo-clipart-5374089-pinclipart.png"
  //             alt=""
  //           />
  //         </div>
  //         <div class="mail-body">
  //           <img
  //             style="max-width: 100%"
  //             src="https://media.emailonacid.com/wp-content/uploads/2014/02/2014-ResponsiveDesignTut.jpg"
  //             alt=""
  //           />

  //           <h2>Hi, ${name}</h2>
  //           <h5>Phone: ${phone}</h5>
  //           <h5>Email: ${email}</h5>
  //           <p>
  //           Hello ${name},Your registration has been completed successfully. Welcome to our company.
  //           Thank you very much.
  //           </p>
  //         </div>
  //       </div>
  //     </body>
  //   </html>
  //   `,
  // });
  // email sending ends here

  /**
   * send sms by "BULK SMS BD"
   */

  // axios.get(
  //   `http://bulksmsbd.net/api/smsapi?api_key=4TZJ5ZeJXC6XM1mNEpb7&type=text&number=(${phone})&senderid=8809617612989&message=Hello ${name},Your registration has been completed successfully. Welcome to our company.
  //   .
  //   --Ashik`
  // );

  // file manage
  let userPhoto = "product_avatar.png";

  if (req.file?.filename) {
    userPhoto = req.file.filename;
  }

  const data = await User.create({
    f_name,
    l_name,
    fullName,
    slug: getProductSlug(fullName),
    age,
    gender,
    address,
    phone,
    email,
    photo: userPhoto,
  });

  // redirect to home page
  res.redirect("/");
};

// update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  // destructure
  const { f_name, l_name, age, address, gender, phone, email } = req.body;
  const fullName = f_name + " " + l_name;

  // Check if there is a file uploaded and set the userPhoto accordingly
  let userPhoto = "";

  if (req.file) {
    userPhoto = req.file.filename;
  } else {
    // If no file was uploaded, fetch the existing user's photo from the database
    const existingUser = await User.findById(id).select("photo");
    if (existingUser) {
      userPhoto = existingUser.photo;
    }
  }

  // const data = await User.updateOne(
  //   { _id: id },
  //   {
  //     $set: {
  //       f_name,
  //       l_name,
  //       fullName,
  //       slug: getProductSlug(fullName),
  //       age,
  //       address,
  //       gender,
  //       phone,
  //       email,
  //       photo: userPhoto,
  //     },
  //   }
  // );

  // // res.send(userPhoto.photo);
  // redirect to home page
  // res.redirect("/");

  const data = await User.findByIdAndUpdate(
    id,
    {
      f_name,
      l_name,
      fullName,
      slug: getProductSlug(fullName),
      age,
      address,
      gender,
      phone,
      email,
      photo: userPhoto,
    },
    { new: true }
  );

  // redirect to home page
  res.redirect("/");
};

// delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  // redirect to home page
  res.redirect("/");
};
