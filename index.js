var express = require('express');
var app = express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
app.listen(3000,()=>console.log('Sever startes'));
var parser = require('body-parser').urlencoded({extended: false});
// app.get('/',(req,res) => res.render('home'));
app.get('/about',(req,res) => res.send('Khao Pham training'));
app.get('/hello',(req,res) => res.render('hello'));
app.get('/chao/:ten',(req,res) => {
  var {ten} = req.params;
  res.send(`Xin chao ${ten}`);
});
app.post('/hello',parser,(req,res) =>{
  var {ten,tuoi} =req.body;
  res.send(`chao ban ${ten}: ${tuoi}`);
});
var {getGirl,likeGirl} = require('./db.js');
app.get('/',(req,res) =>{
  getGirl(1,girl => {
    res.render('home3',{girl});
  })
});
app.get('/api/info/:id',(req,res) => {
  var {id}= req.params;
  getGirl(id, girl => {
    if(!girl){
      return res.send('');
    }
    var r=
    `<h1>${girl.name}</h1>
    <div class="app">
      <a href="#" id='truoc'>Truoc</a>
      <a href="#" id='sau'>Sau</a>
      <input type="hidden" id="gurl-id" value="${girl.id}">
      <img src="images/${girl.image}" alt="">
      <a href="#">${girl.nlike} like</a>
      <a href="#">${girl.ndlike} dislike</a>
    </div>
    `;
    res.send(r);
  })
})

app.get('/api/like/:id',(req,res) =>{
  var {id} = req.params;
  likeGirl(id,nlike =>{
    res.send(nlike+'');
  });
});
