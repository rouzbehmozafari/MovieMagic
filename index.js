const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const apiKey = 'd238de702d59ca703cdf0a8481a4a805'
var Areq;

const app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})

app.post('/',urlencodedParser, function (req, res) {
    let search = req.body.field
    console.log(search)
    let page = '1'
    Areq = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=1&query=${search}&page=${page}`
    axios(Areq)
    .then((response)=> {
        let results = response.data.results
        res.render(__dirname+'/views/pages/home.ejs',{results})
    })
  })
app.get('/:pageNum',(req,res)=>{
    let pageNum = req.params.pageNum
    let newReq = Areq.replace(/.$/,pageNum)
    axios(newReq)
    .then((response)=> {
        let results = response.data.results
        res.render(__dirname+'/views/pages/home.ejs',{results})
    })
})

app.get('/',(req,res)=>{
    axios(`https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805&page=1`)
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


    // https://api.themoviedb.org/3/search/movie?api_key=d238de702d59ca703cdf0a8481a4a805
    // https://api.themoviedb.org/3/search/movie?api_key=d238de702d59ca703cdf0a8481a4a805&query=Jack+Reacher
    // https://api.themoviedb.org/3/search/keyword?api_key=d238de702d59ca703cdf0a8481a4a805&page=1&query=up
    // https://api.themoviedb.org/3/movie/550?api_key=d238de702d59ca703cdf0a8481a4a805
// https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805
// https://api.themoviedb.org/3/discover/movie?api_key=d238de702d59ca703cdf0a8481a4a805&page=2
// https://api.themoviedb.org/3/movie/550/images?api_key=d238de702d59ca703cdf0a8481a4a805&page=2

// https://api.themoviedb.org/3/search/movie?api_key=&{}&page=1&query=${}