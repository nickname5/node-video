import express from 'express';
import { VideoController } from 'controller/VideoController';
import { upload } from 'middleware/multer';
const router = express.Router();

/* GET users listing. */
router.post('/upload/:id', upload.single('video'), VideoController.uploadVideo);

router.get('/:name', VideoController.getVideo);

export default router;
