const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/contact.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */

router
  .route('/GetContactsChatGroup')
  // tìm kiếm
  .get(authorize(LOGGED_USER), controller.GetContactsChatGroup);

router
  .route('/GetContacts')
  // tìm kiếm
  .get(authorize(LOGGED_USER), controller.GetContacts);

router
  .route('/CreateContact')
  // tìm kiếm
  .post(authorize(LOGGED_USER), controller.CreateContact);

router
  .route('/HandleContact')
  // tìm kiếm
  .post(authorize(LOGGED_USER), controller.HandleContact);

router
  .route('/')
  // tạo mới
  .post(authorize(LOGGED_USER), controller.create);

router
  .route('/pending')
  // tìm kiếm
  .get(authorize(LOGGED_USER), controller.yeucauchoxl);

router
  .route('/friends')
  // tìm kiếm
  .get(authorize(LOGGED_USER), controller.danhsachbanbe);

router
  .route('/:id')
  // lấy thông tin
  .get(authorize(), controller.findOne)
  // sửa thông tin
  .patch(authorize(), controller.update)
  // xóa thông tin
  .delete(authorize(), controller.remove);

module.exports = router;
