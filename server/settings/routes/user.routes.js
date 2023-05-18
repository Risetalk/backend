// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const User = require("../../../database/models/user.model");

// Router Instance.
const userRoutes = Router();


userRoutes.post("/", async (req, res) => {

  const {
    first_name,
    last_name,
    user_name,
    profile_picture,
    email,
    date_birth,
    is_tutor,
    about_me,
  } = req.body;

  try {
    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      profile_picture: profile_picture,
      email: email,
      date_birth: date_birth,
      is_tutor: is_tutor,
      about_me: about_me,
    });

    res.status(201).json(user);

  } catch (error) {
    
    res.status(404).json(error);
  }
});
/**
 * @openapi
 * paths:
 *   /user:
 *    get:
 *     tags: [Users]
 *     summary: Get all User Information
 *     description: > 
 *       **This route will return all the information of the user registered in the database.**
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 * 
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *
 *    post:
 *     tags: [Users]
 *     summary: Create a new User
 *     description: >
 *       **This route will create a new user in the database.**
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 * 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 * 
 *    put:
 *     tags: [Users]
 *     summary: Update a User
 *     description: >
 *       **This route will update a user in the database.**
 * 
 *    delete:
 *     tags: [Users]
 *     summary: Delete a User
 *     description: >
 *       **This route will delete a user in the database.**
 * 
 * 
*/

module.exports = userRoutes;
