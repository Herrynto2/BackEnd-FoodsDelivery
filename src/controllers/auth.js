const { conn, connquery } = require("../config/db");
const user = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const upload = require("../middleware/upload");

//Login
const login = async (req, res, next) => {
  try {
    console.log("response", res);
    const { username, password } = req.body;
    if (username && password) {
      const dataLogin = await new Promise((resolve, reject) => {
        connquery(
          `SELECT  COUNT(*) AS total FROM users WHERE username='${username}' || password='${password}'; SELECT userdetail.id_user, users.password, users.is_verified, userdetail.name_user, userdetail.images, userdetail.work, userdetail.address,  users.updated_at, userdetail.email, userdetail.Saldo, userdetail.gender  from userdetail JOIN users on userdetail.id_user=users.id_user where users.username='${username}'`,
          (err, results) => {
            console.log(results[2][0]);
            const { total } = results[1][0];
            console.log(total);
            if (total === 0) {
              reject(new Error(err || "your username hasnt been registered"));
              res.send({
                success: false,
                msg: "your username hasnt been registered",
                data: {
                  token: "",
                },
              });
            } else if (results[2][0].is_verified === 0) {
              res.send({
                success: false,
                msg: "Please verified your account first",
                data: {
                  token: "",
                },
              });
            } else if (
              !err &&
              results[1].length > 0 &&
              bcrypt.compareSync(password, results[2][0].password)
            ) {
              const name_user = results[2][0].name_user;
              const images = results[2][0].images;
              const work = results[2][0].work;
              const address = results[2][0].address;
              const id_user = results[2][0].id_user;
              const updated_at = results[2][0].updated_at;
              const email = results[2][0].email;
              const gender = results[2][0].gender;
              const Saldo = results[2][0].Saldo;
              const userData = {
                username,
                id: results[2][0].id_user,
                name_user,
                images,
                work,
                address,
                id_user,
                updated_at,
                email,
                gender,
                Saldo,
              };
              resolve(userData);
            } else {
              reject(new Error(err || "Username or Password Wrong"));
            }
          }
        );
      });
      const token = jwt.sign(dataLogin, process.env.APP_KEY, {
        expiresIn: "1D",
      });
      res.send({
        success: true,
        msg: "Login Success",
        data: {
          token,
          username,
          id_user: dataLogin.id_user,
          name_user: dataLogin.name_user,
          images: dataLogin.images,
          work: dataLogin.work,
          address: dataLogin.address,
          updated_at: dataLogin.updated_at,
          email: dataLogin.email,
          gender: dataLogin.gender,
          Saldo: dataLogin.Saldo,
        },
      });
    } else {
      throw new Error("Username and Password is Required");
    }
  } catch (e) {
    console.log("error", e);
    res.status(401).send({
      success: false,
      msg: e.message,
    });
  }
};

//Registration
const regist = async (req, res) => {
  console.log("ok");
  const { username, password, name, email } = req.body;
  try {
    var validasiHuruf = /^[a-z1-9]+$/;
    if (username.match(validasiHuruf) && username.length > 7) {
      const create = await user.create(username, password, name, email);
      if (create) {
        res.send({
          success: true,
          msg: "Registration success",
          Verification_codes: create,
        });
      } else {
        res.send({ success: false, msg: "Data already available" });
      }
    } else {
      res.send({
        success: false,
        msg: "username must be lowercarse and minimal 8 charachter",
      });
    }
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
};

//Registration Verify
const Verify = async (req, res, next) => {
  try {
    if (!req.query.code) {
      throw new Error("Required Query code");
    }
    const verify = await user.verifyUser(req.query.code);

    if (verify) {
      res.status(200).send({
        success: true,
        msg: "Your Account successfully verified",
      });
    } else {
      throw new Error("Failed to Verify Your Account");
    }
  } catch (e) {
    res.status(202).send({
      success: false,
      msg: e.message,
    });
  }
};

//Forgot the password
const checkUser = async (req, res) => {
  const { username } = req.body;
  try {
    const check = await user.checkUsername(username);
    if (check) {
      res.send({ success: true, msg: "Data available" });
    } else {
      res.send({ success: false, msg: "username is not found" });
    }
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
};

//Forgot the password
const forgotPass = async (req, res) => {
  const { username, newpassword, confirmpassword } = req.body;
  try {
    const update = await user.update(username, newpassword, confirmpassword);

    if (newpassword == confirmpassword) {
      if (update) {
        res.send({
          success: true,
          msg: "Data available",
          verification_code: update,
        });
      } else {
        res.send({ success: false, msg: "username is not found" });
      }
    } else {
      res.send({
        success: false,
        msg: "new password and confirm password must be same",
      });
    }
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
};

//get profile user
const getProfile = async (req, res) => {
  const iduser = req.auth.id;
  const { id } = req.params;
  try {
    const detail = await user.get(id, iduser);
    if (detail) {
      res.send({
        success: true,
        data: detail,
      });
    } else {
      res.send({
        success: false,
        message: "Failed",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//change profile user
const changeProfile = async (req, res) => {
  console.log("ok", req);
  try {
    await upload(req, res, "images");
    req.body.images = "/uploads/" + req.file.filename;
    const { id } = req.params;
    const key = Object.keys(req.body);
    const params = key
      .map((v, i) => {
        if (
          v &&
          (key[i] === "name_user" ||
            key[i] === "email" ||
            key[i] === "gender" ||
            key[i] === "address" ||
            key[i] === "work" ||
            key[i] === "images")
        ) {
          if (req.body[key[i]]) {
            return { keys: key[i], value: req.body[key[i]] };
          } else {
            return null;
          }
        } else {
          return null;
        }
      })
      .filter((o) => o);

    const iduser = req.auth.id;
    const update = await user.change(id, iduser, params, req.body.images);
    if (update) {
      res.send({
        success: true,
        msg: `User profile id ${iduser} has been updated`,
      });
    } else {
      res.send({ success: false, msg: "Failed to change profile" });
    }
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
};

//Delete Profile User
const delProfile = async (req, res) => {
  const { id } = req.params;
  const del = await user.delete(id);
  if (del) {
    res.send({ success: true, Message: `delete ID :${id} success` });
  } else {
    res.send({ success: false, Message: "delete failed" });
  }
};

module.exports = {
  login,
  regist,
  Verify,
  forgotPass,
  checkUser,
  changeProfile,
  delProfile,
  getProfile,
};
