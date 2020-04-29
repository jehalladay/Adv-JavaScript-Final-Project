const router = require('express').Router();

router.get('/', (request, response, next) => {
    response.render('index',  {title: 'Planner'})
});

module.exports = router;