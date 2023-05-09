const {Router}= require('express');
const {getAll,getOne,create,followin,followers} = require('./controller');
const secure=require('../../api/src/components/user/secure');


const router = Router();

 router.get('/followin',followin)
 router.get('/followers',followers)
router.get('/:tabla',getAll)


// router.post('/follow/:id',secure('follow'),createFollow)
router.get('/:tabla/:id',getOne)
router.post('/:tabla',create)
// router.delete('/follow',secure('follow'),removeFollow)
// router.delete('/:tabla/:id',remove)

//router.put('/:tabla',update)
module.exports= router;
