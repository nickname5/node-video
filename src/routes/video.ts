import express from 'express';
import { VideoController } from 'controller/VideoController';
import { upload } from 'middleware/multer';
const router = express.Router();

/* GET users listing. */
router.post('/upload/:id', upload.single('video'), VideoController.uploadVideo);

router.get('/:name', VideoController.getVideo);

router.get('/list/p=:page&l=:limit&o=:order&d=:direction', VideoController.getVideoList);

export default router;
