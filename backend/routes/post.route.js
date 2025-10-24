import express from "express"
import { getPosts,getPost,createPost,deletePost} from "../controllers/post.controller.js"

const router = express.Router()

router.get("/",getPosts)
router.get("/:slag",getPost)
router.post("/:slug",createPost)
router.delete("/:id",deletePost)

export default router