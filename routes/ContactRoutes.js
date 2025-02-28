import { Router } from "express";
import { searchContacts } from "../controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRouter = Router();

contactsRouter.post("/search", verifyToken, searchContacts);

export default contactsRouter;