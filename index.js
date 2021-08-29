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
    item = { 
        full: req.body.fullUrl,
        short: nanoid(5)/*shortId.generate()*/,
        clicks: 0
    };
    items = [ item ];
    await db.put(item);
    res.render('table', { shortUrls: items })
})

app.get('/:shortUrl', async (req, res) => {  
    const result = await db.fetch({ short: req.params.shortUrl});
    if (result.count == 0) return res.render('404', { text: 'Please make sure that the capitalization and spelling of the URL is all correct' });
    const item = result.items[0];
    const toUpdate = { clicks: item.clicks + 1 };
    await db.update(toUpdate, item.key);
    res.redirect(item.full);
})

// export 'app'
module.exports = app
// app.listen(3000)