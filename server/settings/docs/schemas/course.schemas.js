

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - user_name
 *         - email
 *         - date_birth
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID del usuario.
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
 *         is_staff:
 *           type: boolean
 *           description: Indica si el usuario es personal de staff o no.
 *         is_active:
 *           type: boolean
 *           description: Indica si el usuario está activo o no.
 *         about_me:
 *           type: string
 *           description: Información sobre el usuario.
 *       example:
 *         id: d15cf475-5be9-4d23-b6f3-0ef24e7e20c1
 *         first_name: John
 *         last_name: Doe
 *         user_name: johndoe
 *         profile_picture: profile.jpg
 *         email: johndoe@example.com
 *         date_birth: 1990-01-01
 *         is_tutor: false
 *         is_staff: false
 *         is_active: true
 *         about_me: Soy desarrollador de software.
 */
