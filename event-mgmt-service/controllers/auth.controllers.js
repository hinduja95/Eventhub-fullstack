const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");
const eventDB = require("../config/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

exports.login = async (req, res) => {
  console.log("req.body", req.body);
  const { emailAddress, password } = req.body;

  const user = await eventDB.query(
    `select email_address, password, id, role from users where email_address = :email`,
    { replacements: { email: emailAddress }, type: QueryTypes.SELECT }
  );

  console.log("USER", user);
  console.log("secret", secret);

  if (user.length === 0) {
    return res.status(400).send("Email is not found");
  }

  try {
    console.log("password", password);
    console.log("user.password", user[0].password);
    // Compare the provided password with the stored hashed password
    const verifyPassword = await bcrypt.compare(password, user[0].password);
    if (verifyPassword) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 1 * 60,
          data: {
            email: user[0].email_address,
            role: user[0].role,
            userId: user[0].id,
          },
        },
        secret
      );

      return res.status(200).json({ jwt: token, user: user[0].id, email: user[0].email_address,
            role: user[0].role, });
    } else {
      return res.status(400).send("Invalid email or password");
    }
  } catch (err) {
    console.log("error in logging in", err);
    return res.status(500).send("Error logging in");
  }
};

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const emailAddress = req.body.emailAddress;
    const password = hashedPassword;
    const fullName = req.body.fullName;
    const dob = req.body.dob || null;
    const gender = req.body.gender || 1;
    const occupation = req.body.occupation || "student";
    const mobile = req.body.mobile || "";
    const addressLine1 = req.body.addressLine1 || "";
    const addressLine2 = req.body.addressLine2 || "";
    const district = req.body.district || "";
    const state = req.body.state || "";
    const country = req.body.country || "";
    const status = 1;
    const createdAt = new Date();
    const role = "user";

    console.log("level 1");
    const existingUser = await eventDB.query(
      `select email_address from users where email_address='${emailAddress}'`,
      { type: QueryTypes.SELECT }
    );

    console.log("level 2", existingUser.length);
    if (existingUser.length > 0) {
      return res.status(409).send("Email already exists");
    }

    let insertQuery = `INSERT INTO users (email_address, password, full_name, date_of_birth, gender, mobile, occupation, address_line_1,
                              address_line_2, country, state, district, status, created_at,role)
                         VALUES (:emailAddress, :password, :fullName, :dob,:gender, :mobile, :occupation,
                                  :addressLine1, :addressLine2, :country, :state, :district,:status, :createdAt, :role )`;

    const addUser = await eventDB.query(insertQuery, {
      replacements: {
        emailAddress,
        password,
        fullName,
        dob,
        gender,
        mobile,
        occupation,
        addressLine1,
        addressLine2,
        country,
        state,
        district,
        status,
        createdAt,
        role,
      },
      types: QueryTypes.INSERT,
    });

    res.status(201).send("User registered successfully");
  } catch (err) {
    console.log("Err in user reg", err);
    res.status(500).send("Error registering user");
  }
};

//     try {
//         const { emailAddress, password } = req.body;

//         // Check if user already exists
//         const existingUser = users.find(user => user.emailAddress === emailAddress);
//         if (existingUser) {
//             return res.status(409).send('Email already exists');
//         }
//               const hashedPassword = await bcrypt.hash(password, 10);

//         // Store the user data in memory
//         const newUser = {
//             id: Date.now().toString(), // Simple unique ID
//             emailAddress,
//             password: hashedPassword
//         };
//         users.push(newUser);

//         res.status(201).send('User registered successfully');
//     } catch {
//         res.status(500).send('Error registering user');
//     }
// }
exports.updateUser = async (req, res) => {
  console.log("update user request params", req.params);
  console.log("update user request body", req.body);
  const id = parseInt(req.params.primaryId);

  try {
    const existingUser = await eventDB.query(
      `select * from users where id = :id`,
      { replacements: { id: id }, type: QueryTypes.SELECT }
    );

    if (existingUser.length === 0) {
      return res.status(404).send("ID is not found");
    }

    const hashedPassword = await bcrypt.hash(existingUser[0].password, 10);
    const password = hashedPassword;
    const fullName = req.body.fullName || existingUser[0].full_name;
    const dob = req.body.dob || existingUser[0].date_of_birth;
    const gender = req.body.gender || existingUser[0].gender;
    const occupation = req.body.occupation || existingUser[0].occupation;
    const mobile = req.body.mobile || existingUser[0].mobile;
    const addressLine1 =
      req.body.addressLine1 || existingUser[0].address_line_1;
    const addressLine2 =
      req.body.addressLine2 || existingUser[0].address_line_2;
    const district = req.body.district || existingUser[0].district;
    const state = req.body.state || existingUser[0].state;
    const country = req.body.country || existingUser[0].country;
    const role = req.body.role || existingUser[0].role;
    // const createdAt = new Date();

    let updateQuery = `UPDATE users SET
               
                password = :password,
                full_name = :fullName,
                date_of_birth = :dob,
                gender = :gender,
                mobile = :mobile,
                occupation = :occupation,
                address_line_1 = :addressLine1,
                address_line_2 = :addressLine2,
                country = :country,
                state = :state,
                district = :district,
                role =:role
            WHERE id = :id`;

    const updateUser = await eventDB.query(updateQuery, {
      replacements: {
        password,
        fullName,
        dob,
        gender,
        mobile,
        occupation,
        addressLine1,
        addressLine2,
        country,
        state,
        district,
        role,
        id,
      },
      types: QueryTypes.UPDATE,
    });
    console.log("updateuser", updateUser);

    res.status(201).send(`User info updated successfully for id:${id}`);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Error while updating user");
  }
};

exports.updatePassword = async (req, res) => {
  console.log("req.body", req.body);
  const { emailAddress, password } = req.body;

  const user = await eventDB.query(
    `select email_address, password, id from users where email_address = :email`,
    { replacements: { email: emailAddress }, type: QueryTypes.SELECT }
  );

  console.log("USER", user);

  if (user.length === 0) {
    return res.status(400).send("Email is not found");
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userId = user[0].id;
    const query = `UPDATE users SET password=:hashedPassword where id=:userId`;
    const updatePassword = await eventDB.query(query, {
      replacements: { hashedPassword, userId },
      types: QueryTypes.UPDATE,
    });

    return res.status(200).send("password updated successfully");
  } catch (err) {
    console.log("err in updating password", err);
    return res.status(500).send("Error updating password", err);
  }
};

exports.getUser = async (req, res) => {
  console.log("get user request params", req.params);
  const id = parseInt(req.params.primaryId);
  try {
    const existingUser = await eventDB.query(
      `select * from users where id = :id`,
      { replacements: { id: id }, type: QueryTypes.SELECT }
    );

    if (existingUser.length === 0) {
      return res.status(404).send("unable to find user data");
    }

    let value = {
      fullName: existingUser[0].full_name,
      dob: existingUser[0].date_of_birth,
      gender: existingUser[0].gender,
      occupation: existingUser[0].occupation,
      mobile: existingUser[0].mobile,
      addressLine1: existingUser[0].address_line_1,
      addressLine2: existingUser[0].address_line_2,
      district: existingUser[0].district,
      state: existingUser[0].state,
      country: existingUser[0].country,
      role: existingUser[0].role,
      status: existingUser[0].status,
      createdAt: existingUser[0].created_at,
    };

    console.log("user value", value);
    res.status(201).json(value);
  } catch (err) {
    console.log("err", err);
    res.status(500).send("Error while getting user");
  }
};
