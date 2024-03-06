const multer = require("multer")

const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/posts");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
})

const postDocsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/documents/posts");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
})

const imgFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

  if (!allowedTypes.includes(file.mimetype)) {
    cb(null, false)
  }
  cb(null, true)
}

// const docsFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

//   if (!allowedTypes.includes(file.mimetype)) {
//     cb(null, false)
//   }
//   cb(null, true)
// }

const postImageUpload = multer({ 
  storage: postImageStorage,
  limits: { fileSize: 1024 * 1024 * 5}, // by bytes 5MB
  fileFilter: imgFilter
})

const profileImageUpload = multer({ 
  storage: profileImageStorage,
  limits: { fileSize: 1024 * 1024 * 5},
  fileFilter: imgFilter
})


const postDocsUpload = multer({ 
  storage: postDocsStorage,
  limits: { fileSize: 1024 * 1024 * 5},
  fileFilter: docsFilter
})

module.exports = {
  postImageUpload,
  profileImageUpload,
  postDocsUpload
}