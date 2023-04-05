import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

//GET MOSTRA TODAS AS CONTAS

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

//GET BUSCA PELO ID

app.get('/accounts/:id', (req: Request, res: Response) => {
    const id = req.params.id

    const result = accounts.find((account)=>{
        return account.id === id
    })
    res.status(200).send(result)
})

//ENDPOINT QUE DELETA UMA ID ESPECIFICA

app.delete('/accounts/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const indexToRemove = accounts.findIndex((account)=>{
        return account.id === id
    })

    if(indexToRemove >= 0){
        accounts.splice(indexToRemove,1)
    }

    res.status(200).send("Item deletado com sucesso")
})

//MODIFICAR DADOS

app.put('/accounts/:id', (req: Request, res: Response) =>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account)=>{
        return account.id === id
    })

    if(account){
        // account.id=newId ? newId : account.id
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.balance = isNaN(newBalance) ? account.balance : newBalance
        account.type = newType || account.type

    }
    res.status(200).send("Atualização realizada com sucesso")
})