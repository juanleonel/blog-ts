import express from 'express';
import { UserModel } from '../models/user.model';
const router = express.Router();

router.get("/sign-up", (req, res) => res.render("sign-up-form"));
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });

    res.redirect("/");
  } catch(err) {
    return next(err);
  }
});

export default router;
