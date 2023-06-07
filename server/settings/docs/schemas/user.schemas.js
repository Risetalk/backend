/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - user_name
 *         - email
 *         - password
 *         - date_birth
 *       properties:
 *         first_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: User's first name.
 *         last_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: User's last name.
 *         user_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: User's username.
 *         profile_picture:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: URL of the user's profile picture.
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 50
 *           minLength: 1
 *           description: User's email address.
 *         password:
 *           type: string
 *           maxLength: 50
 *           minLength: 8
 *           description: User's password.
 *         date_birth:
 *           type: string
 *           format: date
 *           description: User's date of birth.
 *         is_tutor:
 *           type: boolean
 *           description: Indicates whether the user is a tutor or not.
 *         about_me:
 *           type: string
 *           description: Information about the user.
 *       example:
 *         first_name: joel
 *         last_name: vegas
 *         user_name: joelvegas2023
 *         email: joelvegas@gmail.com
 *         password: password123
 *         date_birth: 1990-01-01
 * 
 *     UserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 201
 *         message:
 *           type: string
 *           example: User created successfully
 *         data:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         status: 201
 *         message: User created successfully
 *         data:
 *           id: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *           profile_picture: "https://example.com/image.jpg"
 *           is_staff: false
 *           is_active: true
 *           first_name: "joel"
 *           last_name: "vegas"
 *           user_name: "joelvegas2023"
 *           email: "joelvegas@gmail.com"
 *           date_birth: "1990-01-01"
 *           is_tutor: false
 *           about_me: "I am a software developer."
 *           updatedAt: "2021-08-31T04:00:00.000Z"
 *           createdAt: "2021-08-31T04:00:00.000Z"
 * 
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address.
 *         password:
 *           type: string
 *           maxLength: 50
 *           minLength: 8
 *           description: User's password.
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: User logged in successfully
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *             first_name:
 *               type: string
 *               example: "joel"
 *             last_name:
 *               type: string
 *               example: "vegas"
 *             user_name:
 *               type: string
 *               example: "joelvegas2023"
 *             email:
 *               type: string
 *               example: "joelvegas@gmail.com"
 *             date_birth:
 *               type: string
 *               example: "1990-01-01"
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vbWJyZSIsImlhdCI6MTYzMDIyNjg3OSwiZXhwIjoxNjMwMjI3Njc5fQ.HkiWqBAMHLG2D6S...Xzdaomq4RUV0lvN-XvdDl9w"
 *             profile_picture:
 *               type: string
 *               example: "https://example.com/image.jpg"
 *       example:
 *         status: 200
 *         message: User logged in successfully
 *         data:
 *           id: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *           first_name: "joel"
 *           last_name: "vegas"
 *           user_name: "joelvegas2023"
 *           email: "joelvegas@gmail.com"
 *           date_birth: "1990-01-01"
 *           token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5vbWJyZSIsImlhdCI6MTYzMDIyNjg3OSwiZXhwIjoxNjMwMjI3Njc5fQ.HkiWqBAMHLG2D6S...Xzdaomq4RUV0lvN-XvdDl9w"
 *           profile_picture: "https://example.com/image.jpg"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConfirmAccountResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: Your account has been confirmed successfully
 *       example:
 *         status: 200
 *         message: Your account has been confirmed successfully
 */
