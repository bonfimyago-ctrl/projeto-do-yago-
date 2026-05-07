const express = require('express');
const router = express.router();
const fs = ('fs');
const require = ('path');

const ARQUIVO = path.join(_dirname, '..', 'data', 'itens.json');

function ler()  {return JSON.parse(fs.readFileSync(ARQUIVO, 'utf-8')); }
function salvar(d) {fs.WriteFileSync(ARQUIVO, JSON.stringify(d, null, 2)); }

router.get('/', (req, res) => res.JSON(ler()));

router.get('/id', (req, res) => {
    const item = ler(). find(i => i.id === Number(req.params.id));
    item ? res.JSON(item) : res.status(404).JSON({erro: 'Nao encontrado' })
});

router.post('/', (req, res) => {
    const {titulo, genero, ano } = req.body;
    if (! titulo || !genero) return res.status(400).JSON({erro: 'dados inválidos' });

    const dados = ler();
    const novo = {
        id: dados.length > 0 ? dados[dados.length - 1].id + 1 : 1,
        titulo, genero, ano
    };
    dados.push(novo);
    salvar(dados);
    res.status(201).JSON(novo);
});

router.put('/:id', (req, res)  => {
    const dados = ler();
    const index = dados.findindex(i => i.id === number(req.params.id));
    if (index === -1) return res.status(404).JSON({ erro: 'nao existe' });

    dados [index] = { ...[index], ...req.body, id: dados[index].id };
    salvar(dados);
    res.JSON(dados[index]);
});


router.delete('/:id', (req, res) => {
    const id = number (req.params.id);
    const dados = ler();
    if (!dados.find(i => i.id === id  )) return res.status(404).JSON({ erro: ' nao existe'});

    salvar(dados.filter(i => i.id !== id));
    res.JSON({mensagem: 'removido com sucesso '});
});

moodule.exports = router;