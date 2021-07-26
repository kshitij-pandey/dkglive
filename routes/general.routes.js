
const router = require('express').Router();
const moment = require('moment')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const auth = require('../config/auth.config');
const mail = require('../middlewares/mailsender');
const Multer = require('multer');
const uploadImage = require('../middlewares/UploadImage.middleware');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});


const Admin = require('../model/admin.model');
const Blog = require('../model/blog.model');
const Video = require('../model/video.model');
const { LoaderTargetPlugin } = require('webpack');



//Home Route
router.get('/', async (req, res) => {
    let blogs = await Blog.find({}).lean().sort({ createdAt: -1 }).limit(3);
    let videos = await Video.find({}).lean().sort({ createdAt: -1 });
    // console.log(videos)

    // Blog.find({}).lean().sort({ createdAt: -1 }).limit(3).then(blogs => {
    //     let NotFoundMsg = ''
    //     if (!blogs) {
    //         NotFoundMsg = 'Not Found!'
    //         return
    //     }
    // })
    return res.render('home', { title: "Home", blogs: blogs, videos: videos });
})

router.get('/blog', async (req, res) => {
    let one_blog_id = req.cookies['one_blog_id'];
    let blog = await Blog.findById({ _id: one_blog_id }).lean().then(blog => {
        if (!blog) {
            return;
        }
        return blog;
    })
    let blogs = await Blog.find({}).lean().sort({ createdAt: -1 }).limit(3).sort({ created_at: 1 }).then(blogs => {
        let NotFoundMsg = ''
        if (!blogs) {
            NotFoundMsg = 'Not Found!'
            return
        }
        return blogs;
    })
    return res.render('blog', { title: "blog", blog: blog, blogs: blogs })


})

//Blog route
router.get('/blog/:id', (req, res) => {
    const { id } = req.params;
    res.cookie('one_blog_id', id);
    res.redirect('/blog')
})


//Service route
router.get('/services', (req, res) => {
    res.render('services', { title: "services" });
})

//About route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
})

//insight route
router.get('/insights', (req, res) => {
    Blog.find({}).lean().sort({ createdAt: -1 }).then(blogs => {
        let NotFoundMsg = ''
        if (!blogs) {
            NotFoundMsg = 'Not Found!'
            return
        }
        return res.render('insights', { title: 'insights', blogs: blogs });
    })
})

//Careers route
router.get('/careers', (req, res) => {
    res.render('careers', { title: 'careers' });
})

//Contact route
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'contact' });
})

//login route
router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email }).then(admin => {
        if (!admin) {
            return res.render('login', { error: true })
        }
        if (admin.password === password) {
            const payload = { id: admin._id, email: admin.email, name: admin.name }
            jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                let B_token = `Bearer ${token}`;
                res.cookie('x-access-token', token);
                return res.redirect('/blog_home')
            })
        } else {
            return res.render('login', { error: true })
        }
    })

})


//admin blog home
router.get('/blog_home', auth, async (req, res) => {
    let isAuthenticated = true;

    let blogs = await Blog.find({}).lean().sort({ createdAt: -1 });
    let videos = await Video.find({}).lean().sort({ createdAt: -1 });
    // console.log(videos);

    // Blog.find({}).lean().sort({ createdAt: -1 }).then(blogs => {
    //     let NotFoundMsg = ''
    //     if (!blogs) {
    //         NotFoundMsg = 'Not Found!'
    //         return
    //     }
    // })
    return res.render('admin_blog_home', { title: 'home', blogs: blogs, videos: videos, isAuthenticated });

})

//admin add blog
router.get('/add_blog', auth, (req, res) => {
    let isAuthenticated = true;
    let blog_id = req.cookies['blog_id']
    if (blog_id) {
        Blog.findById({ _id: blog_id }).lean().then(blog => {
            res.clearCookie('blog_id');
            return res.render('admin_add_blog', { title: 'add blog', blog });
        })
    } else {
        return res.render('admin_add_blog', { title: 'home', isAuthenticated });
    }
})

router.post('/add_blog', multer.single("file"), async (req, res) => {
    const { blog_title, blog_para, blog_id, blog_image } = req.body;
    let datee = moment(Date.now()).format('LL');
    console.log('date: ', datee);
    let url;
    console.log('req_file: ', req.file);
    console.log('req.body: ', req.body);

    if (req.file) {
        url = await uploadImage(req.file).then(url => {
            return url
        }).catch(err => {
            return null;
        })
    } else {
        if (blog_id) {
            url = await Blog.findById({ _id: blog_id }).then(blog => {
                console.log('returning url from db');
                return blog.imgUrl
            })
        }
    }

    if (blog_id) {
        let updateBlog = {
            title: blog_title,
            description: blog_para,
            imgUrl: url,
            date: datee
        }



        Blog.updateOne({ _id: blog_id }, { $set: updateBlog }).then(blog => {
            return res.redirect('/blog_home')
        }).catch(err => {
            console.log(err);
        })

    } else {
        let newBlog = new Blog({
            title: blog_title,
            description: blog_para,
            imgUrl: url,
            date: datee
        })
        return newBlog.save().then(() => res.redirect('/blog_home'))
    }

})


router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    res.cookie('blog_id', id);
    return res.redirect('/add_blog');
})

router.get('/delete/:id', (req, res) => {
    Blog.findByIdAndDelete({ _id: req.params.id }).then(() => {
        return res.redirect('/blog_home')
    })
})

router.get('/add_video', (req, res) => {
    let isAuthenticated = true;
    return res.render('admin_add_video', { title: 'home | add video', isAuthenticated });
})

router.post('/add_video', (req, res) => {
    const { video_url, video_name } = req.body;
    let uniqueKey = video_url.replace('https://www.youtube.com/watch?v=', '');
    let newUrl = `https://www.youtube.com/embed/${uniqueKey}`

    let newVideo = new Video({
        videoUrl: newUrl,
        video_name: video_name
    })
    newVideo.save().then(() => res.redirect('/blog_home'))
})

router.get('/video/delete/:id', (req, res) => {
    Video.findByIdAndDelete({ _id: req.params.id }).then(() => {
        return res.redirect('/blog_home')
    })
})

router.post("/add_user_notification", (req, res) => {
  let email= req.body.userEmail;
  mail(email, "You have blah blah");
  mail("notification@cadkg.in", "Subscribed" + email);
  res.redirect("/");
})


module.exports = router;
