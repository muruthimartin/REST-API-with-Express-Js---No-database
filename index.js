const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const {v4:uuid} = require('uuid')
uuid();

//including express body parsers for form and json data
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

//setting the view engine to ejs and default views folder to views
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id:uuid(),
        username:'Mary',
        comment:'I dont think he did it'},
    {
        id:uuid(),
        username:'June',
        comment:'ooh I think he did'},
    {
        id:uuid(),
        username:'Jane',
        comment:'What are you guys talking about'},
    {
        id:uuid(),
        username:'James',
        comment:'I have been asking the same thing'},
    {
        id:uuid(),   
        username:'Jeremy',
        comment:'Let us get out of here'}
]
//get comments
app.get("/comments",(req,res)=>{
    res.render('comments/index', {comments})
})
//route to get the form
app.get("/comments/new",(req, res)=>{
    res.render('comments/new')
})
//route to post the data from the form to the database
app.post("/comments",(req, res)=>{
    const {username, comment} = req.body
    comments.push({username, comment, id:uuid()})
    res.redirect("/comments")
})
//get a specific comment
app.get("/comments/:id", (req,res)=>{
    const {id} = req.params
    const comment = comments.find(c => c.id===id)
    res.render('comments/show', {comment})
})
app.get("/comments/:id/edit", (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id===id);
    res.render("comments/edit", {comment});
})

//updating something in the comment
app.patch("/comments/:id", (req,res)=>{
    const {id} = req.params;        
    const foundComment = comments.find(c => c.id===id);
    const newCommentText = req.body.comment;
    foundComment.comment= newCommentText;
    res.redirect('/comments');
})
//destroy a comment
app.delete("/comments/:id", (req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect("/comments")

})


//starting the server
app.listen(3000, ()=>{
    console.log("Server is up and running")

}) 