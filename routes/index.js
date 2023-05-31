var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/files', (req,res)=>{
  
  let path = req.query.path;

  if (fs.existsSync(path)){

    fs.readFile(path, (err, data)=>{

      if(err){
        console.log(err)
        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).end(data);
      }
    }) 

  } else {
    res.status(404).json({
      error:'File Not Found!'
    });

  }

});

router.delete('/files', (req, res)=>{

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true 
  });    

  form.parse(req, (err, field, files)=>{

    let path = field.path;

    if (fs.existsSync(path)) {

      fs.unlink(path, err=>{

        if (err) {
          res.status(400).json({
            err
          });
        } else {

          res.json({
            field
          });

        }

      });

    } else {

      res.status(404).json({
        error:'File not found!'
      });
  
    }

  });

});

  router.post('/upload', (req, res) => {

    let form = new formidable.IncomingForm({
      uploadDir: './upload',
      keepExtensions: true 
    });    

    form.parse(req, (err, field, files)=>{

      res.json({
        files
      });

    });

    

  });

module.exports = router;
