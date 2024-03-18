const multer = require("multer")

const postUploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/postUploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profileUploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  if (!allowedTypes.includes(file.mimetype)) {
    console.log("fileFilter: File is not accepted!")
    cb(null, false);
  }
  cb(null, true);
};

const imgFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedTypes.includes(file.mimetype)) {
    console.log("imgFilter  : File is not accepted!")
    cb(null, false);
  }
  cb(null, true);
};


const postFileUpload = multer({
  storage: postUploadStorage,
  limits: { fileSize: 1024 * 1024 * 10}, // by bytes 10MB
  fileFilter: fileFilter
});

const profileImageUpload = multer({ 
  storage: profileImageStorage,
  limits: { fileSize: 1024 * 1024 * 5},
  fileFilter: imgFilter
})


// const postImageUploadMiddleware = (req, res, next) => {
//   // Use multer upload instance
//   postImageUpload.single("images"), (req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     // Attach file to the request object
//     const filename = req.file.filename;

//     next();
//   });
// };

module.exports = {
  postFileUpload,
  profileImageUpload
}