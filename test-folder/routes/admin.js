const express = require("express");
const adminControllers = require("../controllers/admin");

const router = express.Router();

router.get("/users", (req, res, next)=>{
    adminControllers.listUsers().then(users=>{
        res.json(users);
    }).catch(e=>{
        next(e);
    })
});

router.get("/users/:id" , (req, res, next)=>{
    const { id } = req.params;
    adminControllers.findUser(id).then(data=>res.json(data)).catch(e=>next(e));
})

router.get("/users/:id/todos", (req, res, next)=>{
    const { id } = req.params;
    adminControllers.findUserTodos(id).then(user=>{
        res.json(user);
    }).catch(e=>{
        next(e);
    })
})

router.post("/login", (req, res, next)=>{
    const userCred  = req.body;
    const {username, password} = userCred;
    adminControllers.login(username, password).then(data => res.json(data)).catch(e=> next(e));
})

router.post("/", (req, res, next)=>{
    const userDetails = req.body;
    adminControllers.create(userDetails).then(data => {res.json(data)}).catch(e=> next(e));
});

router.patch("/users/:id", (req, res, next)=>{
    const { id } = req.params;
    const editedData = req.body;
    adminControllers.patchUser(id, editedData).then(user=>{
        res.json(user);
    }).catch(e=>{
        next(e);
    })

});

router.delete("/users/:id", (req, res, next)=>{
    const { id } = req.params;
    adminControllers.deleteUser(id).then(()=>{
        res.status(204).json({message: "Deleted Successfully"});
    }).catch(e=>{
        next(e);
    })
});

router.get("/todos", (req, res, next)=>{
    adminControllers.listTodos().then(todo=>{
        res.json(todo);
    }).catch(e=>{
        next(e);
    })
});

router.get("/todos/:id", (req, res, next)=>{
    const { id } = req.params;
    adminControllers.getTodo(id).then(todo=>{
        res.json(todo);
    }).catch(e=>{
        next(e);
    })
});

router.patch("/todos/:id", (req, res, next)=>{
    const { id } = req.params;
    const editedData = req.body;
    adminControllers.patchTodo(id, editedData).then(data=>res.json(data)).catch(e=> next(e));

});

router.delete("/todos/:id", (req, res, next)=>{
    const { id } = req.params;
    adminControllers.deleteTodoItem(id).then(()=>{
        res.status(204).json({message: "Deleted Successfully"});
    }).catch(e=>{
        next(e);
    })
});

module.exports = router;