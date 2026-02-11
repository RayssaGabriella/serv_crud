// const express = require("express")
import express from "express"
const app = express()
app.use(express.json())
let proximoId = 2
let LISTARALUNOS = [
    {id: 1, nome:"Vitor"},
    {id: 2, nome:"Jansen"},
    {id: 34, nome:"Renan"},
    {id: 35, nome:"Yasmin"}

]
app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Bom dia"
    })         
    //300 até 399 redirecionamento. 400 a 499 erro de cliente, 500..599 erro de servidor
})

app.get("/alunos",(req,res)=>{
    res.status(200).json(LISTARALUNOS)
})

app.get("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)

    if (!aluno){
        res.status(404).json({msg:"usuario não encontrado"})
    }
    res.status(200).json(aluno)
})

//cadastro:
app.post("/alunos",(req,res)=>{
    console.log(req.body)
    const {nome} = req.body
    if (!nome){
        res.status(400).json({msg:"Por gentileza complete o nome!"})
    }
    const id = LISTARALUNOS.length > 0 ? LISTARALUNOS[LISTARALUNOS.length -1].id + 1 : 1
    const aluno = {id:proximoId+1,nome} 
    LISTARALUNOS.push(aluno)
    res.status(201).json({msg:"Aluno Cadastrado com sucesso"})
})
//tratamento de erro post
app.post("/alunos/:id", (req, res) => {
    const id = req.params.id ? Number(req.params.id) : 0;
    if (id != 0) {
        return res.status(404).json({ msg: "Não preencha o campo com ID" });
    }
});

//delete
app.delete("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const aluno = LISTARALUNOS.find(a=>a.id===idParametro)
    console.log(aluno)
    if (aluno === -1){
        res.status(404).json({msg:"usuario não encontrado"})
    }
    LISTARALUNOS.splice(aluno,1)
    res.status(200).json({msg: `Aluno excluido com sucesso`})
})

//tratamento de erro delete
app.delete("/alunos", (req,res)=>{
    console.log("Parametro ", req.params)
    const idParametro = req.params.codigo ? Number(req.params.codigo) : 0 // Condição ? valor_verdadeiro : valor_falso
    if (idParametro === 0){
        return res.status(400).json({msg: `Id é obrigatório`})
    }
})


// alterar
app.put("/alunos/:id",(req,res)=>{
    const idParametro = Number(req.params.id)
    const indiceAluno = LISTARALUNOS.findIndex(a=>a.id===idParametro)
    const {nome} = req.body
    if (!indiceAluno){
        return res.status(404).json({msg:"usuario não encontrado"})
    }
    if (!nome){
        return res.status(404).json({msg:"Nome é obrigatório"})
    }

    LISTARALUNOS[indiceAluno] = {
        id:idParametro, nome 
    }
    salvarDados()
    res.status(200).json(indiceAluno, {msg:"Alteração feita com sucesso!",Indice: indiceAluno})
})
//corrigido
app.put("/alunos", (req, res) => {
    const id = req.params.id ? Number(req.params.id) : 0;
    if (id === 0) {
        return res.status(404).json({ msg: "Aluno não encontrado" });
    }
});

app.listen(5000, ()=>{
    console.log(`Servidor rodando💜`)
})
