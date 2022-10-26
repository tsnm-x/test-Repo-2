const express = require("express");
const todoControllers = require("../controllers/todos");

const router = express.Router();

router.post("/", (req, res, next)=>{
    const todoDetails = req.body;
    const user = req.user;
    todoControllers.create(todoDetails, user.id).then((todo)=>{
        res.json(todo);
    }).catch(e=>{
        next(e);
    });
});

router.patch("/:id", (req, res, next)=>{
    const { id } = req.params;
    const user = req.user;
    const editedData = req.body;
    todoControllers.patch(user.id, id, editedData).then(data=>res.json(data)).catch(e=> next(e));

});

router.delete("/:id", (req, res, next)=>{
    const { id } = req.params;
    const user = req.user;
    todoControllers.deleteItem(id, user.id).then(()=>{
        res.status(204).json({message: "Deleted Successfully"});
    }).catch(e=>{
        next(e);
    })
});

module.exports = router;