const express = require('express')
const router = express.Router()


router
    .route("/:profile")
    .get((req,res) => {

        // check whether "profile" is in database
        // if so, then render page
        res.render("homepagelogged/homepage-loggedin", { username: req.params.profile })
    })

router.get('/', (req,res) => {
    res.render("index")
})


module.exports = router