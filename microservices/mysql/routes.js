const {Router}= require('express');
const {getAll,getOne,create,createFollow,update,remove, removeFollow} = require('./controllers');
const secure=require('../../api/src/components/user/secure');

const router = Router();


router.get('/:tabla',getAll)

router.post('/follow/:id',secure('follow'),createFollow)
router.get('/:tabla/:id',getOne)
router.post('/:tabla',create)
router.delete('/:tabla/:id',secure('follow'),remove)
router.delete('/follow',secure('follow'),removeFollow)
router.put('/:tabla',secure('follow'),update)
module.exports= router;
