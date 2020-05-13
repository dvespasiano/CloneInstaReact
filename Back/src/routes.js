const express = require('express');
const routes = new express.Router();
const PostController = required('./controllers/PostController.js');
const multer = required('multer');
const upload = multer(uploadConfig);
const uploadConfig = required('./controllers/PostController');
const likeController = required('./controllers/LikeController.js');

module.exports = routes;

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', likeController.store);

routes.get('/');
routes.post('/');