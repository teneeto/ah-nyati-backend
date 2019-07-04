import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';
import config from '../db/config/config';

// cloudinary environmental variables
const { cloudinaryConfig } = config;

cloudinary.config(cloudinaryConfig);

// set the storage location of your file
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'avatars',
  allowedFormats: ['jpg', 'png', 'jpeg'],
  filename: (req, file, cb) => {
    // set file name
    cb(undefined, file.originalname);
  },
});

// serves as a parser to enable the application to read image uploads
const upload = multer({ storage });

export default upload;
