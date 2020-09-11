import express from 'express';
import { UserService } from '../service/UserService';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title: 'users',
    users: [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' },
    ]
  });
});

router.get('/:id', async function(req, res, next) { // todo: move to controller
  const id = +req.params.id;

  try {
    const user = await UserService.getUser(id);
    console.log('received user by id: ', id, user);

    res.render('user', {
      user
    });
  } catch(e) {
    next(e);
  }
});

export default router;
