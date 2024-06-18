import app from "./app";
import mintNFT from "servers/testMintNFT";
import { main } from "servers/tranferSOL";
const PORT = 3100;

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
});

/**
 * @openapi
 * /api/health-check:
 *   get:
 *     tags:
 *     - api
 *     summary: Health check endpoint
 *     description: Returns a simple status message to indicate that the service is running.
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Ok"
 */
app.get("/api/health-check", async (req, res) => {
  res.status(200).json("Oksádfasdfssssssss");
});

/**
 * @openapi
 * /api/mint-nft:
 *   get:
 *     tags:
 *     - api
 *     summary: mint NFT
 *     description: Returns a simple status message to indicate that the service is running.
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Ok"
 */
app.get("/api/mint-nft", async (req, res) => {
  await mintNFT();
  // await main();
  res.status(200).json("Oksádfasdsssssfssss");
});

/**
 * @openapi
 * /api/create-nft:
 *   get:
 *     tags:
 *     - api
 *     summary: create NFT
 *     description: Returns a simple status message to indicate that the service is running.
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Ok"
 *      400:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Ok"
 */
app.get("/api/create-nft", async (req, res) => {
  res.status(200).json("Oksádfasdfssssssss");
});