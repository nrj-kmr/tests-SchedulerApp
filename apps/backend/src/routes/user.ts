import { Router } from "express";
import { User } from "../models/user.model";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find({})
  if (!users) return res.send(404).json({ error: "users not fetched" })
  return res.json(users)
})

router.get("/:_id", async (req, res) => {
  const user = await User.findById(req.params._id)
  return res.json(`User with given id: ${req.params._id} is \n ${user}`)
})

router.post("/", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_Name ||
    !body.last_Name ||
    !body.email ||
    !body.user_Name
  ) {
    return res.status(400).json(
      {
        mssg: "All Fields are required!",
        missingInfo: `${req.body}`
      }
    )
  }
  const result = await User.create({
    firstName: body.first_Name,
    lastName: body.last_Name,
    email: body.email,
    userName: body.user_Name
  })

  console.log("result", result)

  return res.status(201).json({ mssg: "User Creation Success" })
})

router.delete("/:_id", async (req, res) => {
  await User.findByIdAndDelete(req.params._id);
  return res.json(`Deletion Successful`);
});

module.exports = router;