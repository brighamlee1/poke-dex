const express = require('express');

const app = express();

const PORT = 3006;

const pokemon = require('./pokedex/models/pokemon')

const methodOverride = require('method-override');

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.redirect('/pokedex')
})

app.get('/pokedex/:id/edit', (req, res) => {
    const onePokemon = pokemon[req.params.id]
    let context = {
        pokemon: onePokemon,
        id: req.params.id,
    }
    res.render('edit.ejs', context)
})

app.get('/pokedex', (req, res) => {
    res.render('index.ejs', { pokemon: pokemon })
})

app.get('/pokedex/new', (req, res) => {
    res.render('new.ejs')
})

app.get("/pokedex/:id", (req, res) => {
    const context = { 
        onePokemon: pokemon[req.params.id],
        id: req.params.id,
    }
    res.render("show.ejs", context);
});

app.post('/pokedex', (req, res) => {
    let context = {
        name: req.body.name,
        img: req.body.img,
        type: [
            req.body.type[0],
            req.body.type[1],
            req.body.type[2],
        ],
        stats: {
            hp: req.body.stats[0],
            attack: req.body.stats[1],
            defense: req.body.stats[2],
        }
    }
    pokemon.push(context);
    res.redirect(`/pokedex/${pokemon.length - 1}`);
})

app.delete('/pokedex/:id', (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect('/');
});

app.put('/pokedex/:id', (req, res) => {
    req.body.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
    }
    console.log(req.body)
    pokemon[req.params.id] = req.body;
    res.redirect(`/pokedex/${req.params.id}`)
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})