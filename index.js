require("dotenv").config()

// install express with `npm install express`
const express = require('express')
const shortId = require('shortid')
var { nanoid } = require("nanoid");
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(express.json()) // for parsing application/json bodies

const { Deta } = require("deta")

// add your Project Key
const deta = Deta(process.env.PROJECT_KEY)
// name your DB
const db = deta.Base("urls")

app.get('/', async (req, res) => {
    const shortUrls = await db.fetch({});
    res.render('index', { shortUrls: shortUrls.items })
})

app.post('/shortUrls', async (req, res) => {
    await db.put({ 
        full: req.body.fullUrl,
        short: nanoid(5)/*shortId.generate()*/,
        clicks: 0
    })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {  
    const result = await db.fetch({ short: req.params.shortUrl});
    const shortUrl = result.items === [] ? [] : result.items[0];
    if (shortUrl === []) return res.sendStatus(404)
    const toUpdate = { clicks: result.items[0].clicks + 1 };
    await db.update(toUpdate, result.items[0].key);
    res.redirect(shortUrl.full)
})

// export 'app'
module.exports = app
// app.listen(3000)