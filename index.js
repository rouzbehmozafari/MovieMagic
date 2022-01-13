const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const apiKey = 'd238de702d59ca703cdf0a8481a4a805'
// https://api.themoviedb.org/3/movie/550?api_key=d238de702d59ca703cdf0a8481a4a805
// https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805
// https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805&page=2
// https://api.themoviedb.org/3/movie/550/images?api_key=d238de702d59ca703cdf0a8481a4a805&page=2

const app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})

app.post('/search',urlencodedParser, function (req, res) {
    // req.body
    console.log(req.body.field)
  })

// search Box


app.get('/',(req,res)=>{
    let pageNum = req.params.pageNum
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805&page=1`)
    .then((response)=> {
        let results = response.data.results
        res.render(__dirname+'/views/pages/home.ejs',{results})
    })
})
app.get('/:pageNum',(req,res)=>{
    let pageNum = req.params.pageNum
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805&page=${pageNum}`)
    .then((response)=> {
        let results = response.data.results
        res.render(__dirname+'/views/pages/home.ejs',{results})
    })
})
app.get('/assets/styles/style.css',(req,res)=>{
    res.sendFile(__dirname+ '/assets/styles/style.css')
})
// function search () {
//     console.log(input.value)
// }

const PORT  = 4040
app.listen(PORT,console.log('listening on: ',PORT))