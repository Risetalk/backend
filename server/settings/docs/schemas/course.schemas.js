
// Post Course Route.
/**
 * @swagger
 * components:
 *   schemas:
 *     CoursePost:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - language
 *         - background_image
 *         - price
 *         - lessons
 *         - categoryId
 * 
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Nombre del curso.
 *  
 *         description:
 *           type: string
 *           maxLength: 500
 *           minLength: 1
 *           description: Descripción del curso.
 * 
 *         language:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Lenguaje del curso.
 * 
 *         background_image:
 *           type: string
 *           maxLength: 500
 *           minLength: 1
 * 
 *         price:
 *           type: number
 *           maxLength: 500    
 *           minLength: 1
 * 
 *         lessons:
 *           type: array
 *           maxLength: 500
 *           minLength: 1
 *           description: Lecciones del curso.
 * 
 *         categoryId:
 *           type: string
 *           maxLength: 500
 *           minLength: 1
 *           description: Categoria del curso.
 * 
 *       example:
 *         title: "Introduction to Programming"
 *         description: "Learn the basics of programming and start developing your own applications."
 *         background_image: "https://example.com/course_image.jpg"
 *         price: 29.99
 *         lessons: ['12bi3by2b54i3u5b4i35b4o3b5o34', '43bi6by2b55i3u4b4i35b4o3b5o34']
 *         categoryId: 'e1bi14b32ib4iu32b4i1b41i2ub41n4oi45'
 * 
 *     CoursePostResponse:
 *       type: object
 *       properties:
 *         201:
 *           type: boolean
 *           description: Indica si la solicitud se procesó correctamente.
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Id del curso.
 *             title:
 *               type: string
 *               description: Nombre del curso.
 *             description:
 *               type: string
 *               description: Descripción del curso.
 *             background_image:
 *               type: string
 *               description: Imagen de fondo del curso.
 *             price:
 *               type: number
 *               description: Precio del curso.
 *             released_date:
 *               type: string
 *               description: Fecha de lanzamiento del curso.
 *             rating:
 *               type: number
 *               description: Calificación del curso.
 *             updatedAt:
 *               type: string
 *               description: Fecha de actualización del curso.
 *             createdAt:
 *               type: string
 *               description: Fecha de creación del curso.
 * 
 *       example:
 *         id: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *         released_date: "2021-08-31T04:00:00.000Z"
 *         rating: 0
 *         title: "Introduction to Programming"
 *         description: "Learn the basics of programming and start developing your own applications."
 *         background_image: "https://example.com/course_image.jpg"
 *         price: 29.99
 *         updatedAt: "2021-08-31T04:00:00.000Z"
 *         createdAt: "2021-08-31T04:00:00.000Z"
 * 
 */

// Get Course By Id.
/**
 * @swagger
 * components:
 *   schemas:
 *     CourseByIdResponse:
 *       type: object
 *       properties:
 *         201:
 *           type: boolean
 *           description: Indica si la solicitud se procesó correctamente.
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Id del curso.
 *             title:
 *               type: string
 *               description: Nombre del curso.
 *             description:
 *               type: string
 *               description: Descripción del curso.
 *             background_image:
 *               type: string
 *               description: Imagen de fondo del curso.
 *             price:
 *               type: number
 *               description: Precio del curso.
 *             released_date:
 *               type: string
 *               description: Fecha de lanzamiento del curso.
 *             rating:
 *               type: number
 *               description: Calificación del curso.
 *             updatedAt:
 *               type: string
 *               description: Fecha de actualización del curso.
 *             createdAt:
 *               type: string
 *               description: Fecha de creación del curso.
 *             video:
 *               type: number
 *               description: Número de videos del curso.
 * 
 *       example:
 *         id: "90cf919a-fb0c-4101-968f-d097fdc43b82"
 *         released_date: "2021-08-31T04:00:00.000Z"
 *         rating: 0
 *         title: "Introduction to Programming"
 *         description: "Learn the basics of programming and start developing your own applications."
 *         background_image: "https://example.com/course_image.jpg"
 *         price: 29.99
 *         updatedAt: "2021-08-31T04:00:00.000Z"
 *         createdAt: "2021-08-31T04:00:00.000Z"
 *         video: 0
 * 
 */

// Get All Courses.
/**
 * @swagger
 * components:
 *   schemas:
 *     CourseAllResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id del curso.
 *           title:
 *             type: string
 *             description: Nombre del curso.
 *           description:
 *             type: string
 *             description: Descripción del curso.
 *           background_image:
 *             type: string
 *             description: Imagen de fondo del curso.
 *           price:
 *             type: number
 *             description: Precio del curso.
 *           released_date:
 *             type: string
 *             description: Fecha de lanzamiento del curso.
 *           rating:
 *             type: number
 *             description: Calificación del curso.
 *           updatedAt:
 *             type: string
 *             description: Fecha de actualización del curso.
 *           createdAt:
 *             type: string
 *             description: Fecha de creación del curso.
 *           video:
 *             type: number
 *             description: Número de videos del curso.
 *
 *       example:
 *         - id: "bf8ee72c-fa68-4197-92e8-3c0429638df4"
 *           released_date: "2022-05-01"
 *           rating: 45
 *           title: "Introducción a la Programación"
 *           description: "Aprende los conceptos básicos de la programación y comienza a desarrollar tus propias aplicaciones."
 *           background_image: "https://example.com/course_image.jpg"
 *           price: 29.99
 *           updatedAt: "2023-05-14T23:20:03.063Z"
 *           createdAt: "2023-05-14T23:20:03.063Z"
 *           video: 0
 *         - id: "9c18f92d-103d-4221-a575-dab2cfaae8eb"
 *           released_date: "2023-05-14"
 *           rating: 0
 *           title: "Introducción a Python"
 *           description: "Aprende los conceptos básicos de la programación y comienza a desarrollar tus propias aplicaciones."
 *           background_image: "https://example.com/course_image.jpg"
 *           price: 29.99
 *           updatedAt: "2023-05-15T02:12:15.963Z"
 *           createdAt: "2023-05-15T02:12:15.963Z"
 *           video: 0
 *         - id: "774ab8d8-7270-43f1-890b-8dbb9d26b94d"
 *           released_date: "2023-05-14"
 *           rating: 0
 *           title: "Introducción a Laravel"
 *           description: "Aprende los conceptos básicos de la programación y comienza a desarrollar tus propias aplicaciones."
 *           background_image: "https://example.com/course_image.jpg"
 *           price: 29.99
 *           updatedAt: "2023-05-15T02:12:19.693Z"
 *           createdAt: "2023-05-15T02:12:19.693Z"
 *           video: 0
*/


// Post View Course Route.
/**
 * @swagger
 * components:
 *   schemas:
 *     postViewCourse:
 *       type: object
 *       required:
 *         - userId
 *         - courseId
 * 
 *       properties:
 *         userId:
 *           type: string
 *           maxLength: 50
 *           minLength: 1
 *           description: Nombre del curso.
 *  
 *         courseId:
 *           type: string
 *           maxLength: 500
 *           minLength: 1
 *           description: Descripción del curso.
 * 
 * 
 *       example:
 *         userId: "12bi3by2b54i3u5b4i35b4o3b5o34"
 *         courseId: "43bi6by2b55i3u4b4i35b4o3b5o34"
 *         
 * 
 * */