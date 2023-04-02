var express = require('express');
var router = express.Router();
router.use(express.json());
const { Pool } = require('pg');

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'root',
  password: 'root',
  port: 5432,
});

const livros = [
  {id: 1, "titulo": "Senhor dos Anéis"},
  {id: 2, "titulo": "Clean Code"},
  {id: 3, "titulo": "Homo Sapiens"},
]

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/livros', (req, res) => {
  res.status(200).send(livros);
})

router.get('/livros/:id', (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id);

  res.status(200).json(livros[index]);
})

router.post('/livros', (req, res) => {
  livros.push(req.body);
  
  res.status(201).send('Livro cadastrado com sucesso');
})

router.put('/livros/:id', (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id);
  livros[index].titulo = req.body.titulo;

  res.status(200).json(livros);
})

router.delete('/livros/:id', (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id);
  livros.splice(index, 1);

  res.status(200).json(livros);
})

router.get('/banco', function(req, res) {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows[0].now);
  });
});

function buscaLivro(id) {
  return livros.findIndex(livro => livro.id === id);
}

module.exports = router;
