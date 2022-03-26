const express = require("express");
module.exports = function(functions, _routes){
    const router = express.Router({ mergeParams: true });
    const routes = [].concat(_routes);
    const funcRouter = router.use(functions);
    routes.forEach(element => {
        element.stack.forEach(element2 => {
            /* element2.route.stack.splice.apply(0, 0, funcRouter.stack); */
            Array.prototype.splice.apply(element2.route.stack, [0, 0].concat(funcRouter.stack))
        })
    });
    return _routes;
}