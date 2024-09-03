import express, { query } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/tasks', async (req, res) => {

    await prisma.task.create({
        data: {
            tittle: req.body.tittle,
            description: req.body.description,
            status: req.body.status
        }
    })

    res.status(201).json(req.body)
})

app.get('/tasks', async (req, res) => {
    let tasks = []
    
    tasks = await prisma.task.findMany()

    res.status(200).json(tasks)
})

app.put('/tasks/:id', async (req, res) => {

    await prisma.task.update({
        where: {
            id: req.params.id
        },
        data: {
            tittle: req.body.tittle,
            description: req.body.description,
            status: req.body.status
        }
    })

    res.status(201).json(req.body)
})

app.delete('/tasks/:id', async (req, res) => {

    await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json()
})

app.listen(3000)