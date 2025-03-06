import { Router } from "express";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRouter = Router();

contactsRouter.post("/search", verifyToken, searchContacts);
contactsRouter.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactsRouter.get("/get-all-contacts", verifyToken, getAllContacts);

export default contactsRouter;