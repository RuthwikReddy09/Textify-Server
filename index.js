const Tesseract = require('tesseract.js');
const express = require('express');
var cors = require("cors");
const app = express();            
const port = 5000;   
app.use(cors()); 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));


app.get("/",(req,res)=>{
  res.send("Hello from server")
})
app.post('/convert', (req, res) => {
    Tesseract.recognize(
        `${req.body.text}`,
        'eng',
        // { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        res.send({output:text});     
      }).catch((err)=>{
        console.warn(err)
      })
    
}); 

app.listen(port, () => {      
    console.log(`Now listening on port ${port}`); 
});