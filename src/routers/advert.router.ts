import { Router } from "express";
import {
  createAdvertController,
  deleteAdvertController,
  getAdvertController,
  updateAdvertController,
} from "../controllers/advert.controller";
import { schemaValidator } from "../middlewares/schemaValidator.middleware";
import {
  createAdvertSchema,
  updateAdvertSchema,
} from "../schema/advert.schema";

const router = Router();

/**
 * @swagger
 * create-advert:
 *   post:
 *     summary: Create a new advert
 *     tags: [Adverts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sigara"
 *               price:
 *                 type: string
 *                 example: "1000"
 *               description:
 *                 type: string
 *                 example: "Sigara"
 *     responses:
 *       201:
 *         description: Advert created successfully
 *       500:
 *         description: DB Error
 */

router.post(
  "/create-advert",
  schemaValidator(createAdvertSchema),
  createAdvertController
);

/**
 * @swagger
 * update-advert:
 *   put:
 *     summary: Update a advert
 *     tags: [Adverts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "32495321321"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sigara"
 *               price:
 *                 type: string
 *                 example: "1000"
 *               description:
 *                 type: string
 *                 example: "Sigara"
 *     responses:
 *       200:
 *         description: Advert updated successfully
 *       500:
 *         description: DB Error
 */
router.put(
  "/:id/update-advert",
  schemaValidator(updateAdvertSchema),
  updateAdvertController
);

/**
 * @swagger
 * delete-advert:
 *   delete:
 *     summary: Delete a advert
 *     tags: [Adverts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "32495321321"
 *     responses:
 *       200:
 *         description: Advert deleted successfully
 *       500:
 *         description: DB Error
 */
router.delete("/:id/delete-advert", deleteAdvertController);

/**
 * @swagger
 * get-advert:
 *   get:
 *     summary: Get a advert
 *     tags: [Adverts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "32495321321"
 */
router.get("/:id", getAdvertController);

export default router;
