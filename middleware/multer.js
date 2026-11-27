const  multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '/uploads')
    },

    filename:(req, file, cb)=>{
        const date = Date.now()
        const rand = Math.floor(Math.random * 1E8)
        const ext = file.originalname.split('.').pop()
        const filename = `IMG-${date}-${rand}${ext}`
        cb(null, filename)
    }
})


const filefilter = (req, file, cb)=>{
    if(file.mimetype.startWiths('image/')){
        cb(null, true)
    }else{
        cb(new Error('Only image are allowed'))
    }
}


const limits = {
    fileSize: 1024 * 1024 * 5
}

const upload =  multer({
    storage,
    filefilter,
    limits
})


module.exports = upload