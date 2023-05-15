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
 *         - date_birth
 *       properties:
 *         first_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Nombre del usuario.
 *         last_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Apellido del usuario.
 *         user_name:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Nombre de usuario del usuario.
 *         profile_picture:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: URL de la imagen de perfil del usuario.
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 50
 *           minLength: 1
 *           description: Dirección de correo electrónico del usuario.
 *         date_birth:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del usuario.
 *         is_tutor:
 *           type: boolean
 *           description: Indica si el usuario es un tutor o no.
 *         about_me:
 *           type: string
 *           description: Información sobre el usuario.
 *       example:
 *         first_name: John
 *         last_name: Doe
 *         user_name: johndoe
 *         profile_picture: "https://example.com/image.jpg"
 *         email: johndoe@example.com
 *         date_birth: 1990-01-01
 *         is_tutor: false
 *         about_me: Soy desarrollador de software.
 * 
 *     UserResponse:
 *       type: object
 *       properties:
 *         201:
 *           type: boolean
 *           description: Indica si la solicitud se procesó correctamente.
 *         data:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         id: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *         profile_picture: "https://example.com/image.jpg"
 *         is_staff: false
 *         is_active: true
 *         first_name: "John"
 *         last_name: "Doe"
 *         user_name: "johndoe"
 *         email: "johndoe@example.com"
 *         date_birth: "1990-01-01"
 *         is_tutor: false
 *         about_me: "Soy desarrollador de software."
 *         updatedAt: "2021-08-31T04:00:00.000Z"
 *         createdAt: "2021-08-31T04:00:00.000Z"
 * 
 */
