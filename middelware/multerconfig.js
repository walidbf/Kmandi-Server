const multer = require("multer")




const storage = multer.diskStorage({


    destination : function(request,file,callback){

        
        callback(null,'./uploads');

    },



    filename : function(request,file,callback){

           callback(null,file.originalname);


  }
});

const upload = multer({

storage : storage,

})


module.exports = upload;