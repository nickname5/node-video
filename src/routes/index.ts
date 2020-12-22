import express from 'express';
import * as pathUtil from 'path';
import * as fs from 'fs';
import { VideoController } from '../controller/VideoController';
const router = express.Router();
import { upload } from 'middleware/multer';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Video app' }); // all videos
});
// video test
// router.get('/watch', function(req, res, next) {
//   res.render('video', {
//     title: 'test video',
//     apiUrl: 'http://localhost:3002'
//   });
// });

router.get('/video', function(req, res, next) {
  const path = pathUtil.join(__dirname, 'public/video/example.mp4');
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunksize = (end-start) + 1;
    const file = fs.createReadStream(path, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

router.post('/upload-video/:id', upload.single('video'), VideoController.uploadVideo);

export default router;
