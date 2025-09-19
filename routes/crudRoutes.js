import express from 'express'
import { createUser, deleteUserByEmail, getAllUsers, getUserByEmail } from '../controllers/crudControllers.js'
const router = express.Router()

router.get('/getAllUsers',getAllUsers)
router.post('/createUser',createUser)
router.post('/getUserByEmail',getUserByEmail)
router.delete('/deleteUserByEmail',deleteUserByEmail)

export default router