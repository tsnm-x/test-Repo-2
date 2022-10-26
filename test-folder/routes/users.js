const express = require("express");
const userControllers = require("../controllers/users");
const authMiddleWare = require('../middleware/auth');

const router = express.Router();


router.post("/", (req, res, next)=>{
    const userDetails = req.body;
    userControllers.create(userDetails).then(data => {res.json(data)}).catch(e=> next(e));
});

router.post("/login", (req, res, next)=>{
    const userCred  = req.body;
    const {username, password} = userCred;
    userControllers.login(username, password).then(data => res.json(data)).catch(e=> next(e));
})

router.get("/:id" , authMiddleWare, (req, res, next)=>{
    const { id } = req.params;
    const user = req.user;
    userControllers.findUser(id, user.id).then(data=>res.json(data)).catch(e=>next(e));
})

router.get("/:id/todos", authMiddleWare, (req, res, next)=>{
    const { id } = req.params;
    const userID = req.user.id
    userControllers.findTodos(id, userID).then(user=>{
        res.json(user);
    }).catch(e=>{
        next(e);
    })
})

router.patch("/:id", authMiddleWare, (req, res, next)=>{
    const { id } = req.params;
    const user = req.user;
    const editedData = req.body;
    userControllers.patch(user.id, id, editedData).then(user=>{
        res.json(user);
    }).catch(e=>{
        next(e);
    })

});

module.exports = router;