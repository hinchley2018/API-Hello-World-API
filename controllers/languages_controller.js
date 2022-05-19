const express = require("express")
const languageRouter = express.Router()
const Language = require("../models/language_model")
const languageSeed = [
    {
        "name": "english",
        "greeting": "Hello world",
        "pangram": "The quick brown fox jumps over the lazy dog",
        "filler": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },{
        "name": "spanish",
        "greeting": "Hola mundo",
        "pangram": "BenjamÃ­n pidiÃ³ una bebida de kiwi y fresa; NoÃ©, sin vergÃ¼enza, la mÃ¡s exquisita champaÃ±a del menÃº"
    },{
        "name": "korean",
        "greeting": "ì„¸ìƒì•„, ì•ˆë…•",
        "pangram": "ì›¬ ì´ˆì½œë¦¿? ì œê°€ ì›í–ˆë˜ ê±´ ë»¥íŠ€ê¸° ì¬ë”ê³¼ ì˜ë¥˜ì˜ˆìš”. ì–˜ì•¼, ì™œ ë˜ ë¶ˆí‰?"
    },{
        "name": "swedish",
        "greeting": "Hej vÃ¤rlden",
        "filler": "LÃ¶ksÃ¥s ipsum Ã¤ng miljoner bÃ¥de varit inom Ã¤ng mjuka ordningens, vid sitt sÃ¶ka jÃ¤st ska stora miljoner ska vi varit, Ã¥ker Ã¤ng brunsÃ¥s trÃ¤utensilierna rÃ¤nnil precis tre dÃ¤r."
    },{
        "name": "hindi",
        "greeting": "à¤¨à¤®à¤¸à¥à¤¤à¥‡ à¤¦à¥à¤¨à¤¿à¤¯à¤¾",
        "pangram": "à¤‹à¤·à¤¿à¤¯à¥‹à¤‚ à¤•à¥‹ à¤¸à¤¤à¤¾à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤¦à¥à¤·à¥à¤Ÿ à¤°à¤¾à¤•à¥à¤·à¤¸à¥‹à¤‚ à¤•à¥‡ à¤°à¤¾à¤œà¤¾ à¤°à¤¾à¤µà¤£ à¤•à¤¾ à¤¸à¤°à¥à¤µà¤¨à¤¾à¤¶ à¤•à¤°à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤µà¤¿à¤·à¥à¤£à¥à¤µà¤¤à¤¾à¤° à¤­à¤—à¤µà¤¾à¤¨ à¤¶à¥à¤°à¥€à¤°à¤¾à¤®, à¤…à¤¯à¥‹à¤§à¥à¤¯à¤¾ à¤•à¥‡ à¤®à¤¹à¤¾à¤°à¤¾à¤œ à¤¦à¤¶à¤°à¤¥ à¤•à¥‡ à¤¬à¤¡à¤¼à¥‡ à¤¸à¤ªà¥à¤¤à¥à¤° à¤¥à¥‡à¥¤",
        "filler": "à¤ªà¥‡à¤¦à¤¾ à¤¤à¤°à¥€à¤•à¥‡ à¤—à¥à¤œà¤°à¤¨à¤¾ à¤¸à¥à¤µà¤¤à¤‚à¤¤à¥à¤° à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤œà¤¿à¤®à¥à¤®à¥‡ à¤…à¤¨à¥à¤µà¤¾à¤¦ à¤¦à¥Œà¤°à¤¾à¤¨ à¤ªà¤¸à¤‚à¤¦ à¤¦à¤¿à¤¯à¥‡ à¤µà¤¿à¤¶à¥à¤µ à¤ªà¥à¤¸à¥à¤¤à¤• à¤®à¥à¤–à¥à¤¯à¤¤à¤¹ à¤­à¤¾à¤¤à¤¿ à¤§à¥à¤µà¤¨à¤¿ à¤ªà¤¹à¥‹à¤šà¤¨à¥‡ à¤¤à¤•à¤¨à¥€à¤•à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤…à¤§à¤¿à¤•à¤¾à¤‚à¤¶ à¤¸à¥‹à¥žà¥à¤Ÿà¤µà¥‡à¤° à¤¸à¤¹à¤¯à¥‹à¤— à¤­à¤¾à¤·à¤¾ à¤¦à¤¿à¤¯à¥‡ à¤ªà¥à¤°à¤¾à¤£ à¤…à¤¸à¤•à¥à¤·à¤® à¤µà¤¿à¤­à¤¾à¤œà¤¨à¤•à¥à¤·à¤®à¤¤à¤¾ à¤ªà¤¹à¥‹à¤šà¥¤ à¤…à¤°à¥à¤¥à¤ªà¥à¤°à¥à¤£ à¤µà¤¿à¤¶à¥à¤µà¤µà¥à¤¯à¤¾à¤ªà¤¿ à¥­à¤¹à¤² à¤µà¤¿à¤µà¤°à¤¨ à¤…à¤§à¤¿à¤•à¤¾à¤° à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤•à¤¾à¤°à¥à¤¯à¤²à¤¯ à¤­à¥€à¤¯à¤¹ à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤§ à¤ªà¥à¤·à¥à¤Ÿà¤¿à¤•à¤°à¥à¤¤à¤¾ à¤µà¤¿à¤¶à¥à¤µà¤µà¥à¤¯à¤¾à¤ªà¤¿ à¤µà¤¿à¤•à¤¾à¤¸ à¤œà¤¿à¤µà¤¨ à¤¸à¥à¤¨à¤¤ à¤œà¤¿à¤®à¥à¤®à¥‡ à¤œà¥à¤¯à¤¾à¤¦à¤¾ à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€ à¤µà¤°à¥à¤£à¤¨ à¤¤à¤•à¤¨à¤¿à¤•à¤² à¤¤à¤•à¤¨à¥€à¤•à¥€ à¤ªà¥à¤°à¤µà¥à¤°à¥à¤¤à¤¿ à¤‰à¤¨à¥à¤¹à¥‡ à¤¸à¥à¤¨à¤¾"
    }, {
        "name": "swahili",
        "greeting": "Salamu, dunia"
    }
]

// GET / returns a list of languages
languageRouter.get("/", (req, res) => {
    Language.find()
        .then( languagesFound => {
            res.json(languagesFound)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error gettting languages"})
        })
})

//seeds our db
languageRouter.get("/seed", (req, res)=> {
    Language.insertMany(languageSeed)
        .then(createdLangauages => {
            res.json({
                message: "Seed Successful"
            })
        })
        .catch(err => {
            // logger.log(err)
            console.log(err)
            res.status(500).json({
                message: "Error seeding db"
            })
        })
})

//GET /random returns a random language
languageRouter.get("/random", async(req, res) => {
     let count = await Language.countDocuments()

     let random = Math.floor(Math.random() * count)
     console.log("Count", count)
     console.log("random", random)
     Language.findOne().skip(random)
        .then(lang => {
            res.json(lang)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error getting random lang"})
        })
})

// GET /:name returns a language
languageRouter.get("/:name", (req, res) => {
    let reqLanguage = req.params.name.toLowerCase()
    Language.findOne({name: reqLanguage})
        .then(languageFound=> {
            if (!languageFound){
                res.status(404).json({message: "Lang not found"})
            }
            res.json(languageFound)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: `Error retrieving ${reqLanguage}`})
        })
})



module.exports = languageRouter