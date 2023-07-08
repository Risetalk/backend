// Third Party Dependencies.
const { Router } = require("express");

// Local Dependencies.
const checkToken = require("../controllers/user/checkToken.controller");
const confirmAccount = require("../controllers/user/confirmAccount.controller");
const forgetPassword = require("../controllers/user/forgetPassword.controller");
const newPassword = require("../controllers/user/newPassword.controller");
const verifyToken = require("../middleware/user/jwt"),
  userRegister = require("../controllers/user/register.controller"),
  googlelogin = require("../controllers/user/googleLogin.controllers"),
  updateUser = require("../controllers/user/updateUser.controllers"),
  deleteUser = require("../controllers/user/deleteUser.controllers"),
  userLogin = require("../controllers/user/login.controller");

// Router Instance.
const userRoutes = Router();

// Register Users.
userRoutes.post("/register", userRegister);
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags: [Users]
 *     summary: Register Users
 *     description: Registers a new user in the application.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       406:
 *         description: Request error - username or email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 406
 *                 message:
 *                   type: string
 *                   example: Username already exists
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

// Login Users.
userRoutes.post("/login", userLogin);
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [Users]
 *     summary: User Login
 *     description: Logs in a user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       404:
 *         description: User not found or incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       401:
 *         description: Account not confirmed or inactive account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Your account has not been confirmed
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


// Confirm account
userRoutes.get("/confirm-account/:token", confirmAccount);
/**
 * @swagger
 * /confirm-account/{token}:
 *   get:
 *     tags: [Users]
 *     summary: Confirm Account
 *     description: Confirms a user's account using the provided token.
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token received for account confirmation.
 *     responses:
 *       200:
 *         description: Your account has been confirmed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConfirmAccountResponse'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: User not found
 *       401:
 *         description: Account already confirmed or inactive account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Your account has already been confirmed
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


// Authenticate with google login
userRoutes.post("/googlelogin", googlelogin);

// Forget password.
userRoutes.post("/forget-password", forgetPassword);

// Verify token
userRoutes.get("/olvide-password/:token", checkToken);

// New password
userRoutes.post("/olvide-password/:token", newPassword);

//update user account
userRoutes.put("/update-user/:id", updateUser);

// delete user account
userRoutes.delete("/delete-user/:id", deleteUser);

module.exports = userRoutes;
