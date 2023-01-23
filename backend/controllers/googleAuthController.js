import asyncHandler from 'express-async-handler';
import queryString from 'query-string';
import dotenv from 'dotenv';
// import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import getTokens from '../utils/authTokens.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';

dotenv.config()

const redirect_uri = 'api/auth/google';

const getLoginUrl = asyncHandler(async (req,res) => {
    const root_url = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirect_uri}`,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email"
        ].join(" ")
    };

    const auth_url =  `${root_url}?${queryString.stringify(options)}`;

    res.send(auth_url);
});

const getUserWithCode = asyncHandler(async (req,res) => {
    // Getting the user from Google with the code
    const code = req.query.code;
  
    const { id_token, access_token } = await getTokens({
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `${process.env.SERVER_ROOT_URI}/${redirect_uri}`,
    });
  
    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch user`);
        throw new Error(error.message);
      });
  
    const token = generateToken(googleUser);
  
    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });
  
    res.redirect(process.env.UI_ROOT_URI);
  
});

const getCurrentUser = asyncHandler(async (req,res) => {
  console.log("get me");
  try {
    const decoded = jwt.verify(req.cookies[process.env.COOKIE_NAME], process.env.JWT_SECRET);
    console.log("decoded", decoded);
    return res.send(decoded);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
});

export {
    getLoginUrl,
    getUserWithCode,
    getCurrentUser
}