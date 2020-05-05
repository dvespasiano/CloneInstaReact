const Post = required('../models/Post.js');
const sharp = required('sharp');
const path = required('path');
const fs = required('fs');


modules.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;
        const [name] = image.split('.');
        const filename = '${name}.jpg'
        await sharp(req.file.path).resize(500).jpeg({ quality: 70 }).toFile(
            path.resolve(req.file.destination, 'resized', image)
        )
        fs.unlinkSync(req.file.path);
        const post = await Post.create({
            author, place, description, hashtags, image: filenamey
        })
        req.io.emit('post', post);
        return res.json(post)
    }
};