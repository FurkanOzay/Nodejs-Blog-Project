import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalame).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    }else {
        cb('Error : Images Only!');
    }
};

const upload = multer ({
    storage,
    limits: { fileSize: 1024 * 1024 * 5},
    fileFilter
});

export default upload;