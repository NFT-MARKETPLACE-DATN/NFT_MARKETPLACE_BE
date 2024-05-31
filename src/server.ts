import app from "./app";

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
  res.status(200).json("Oksádfasdfssss");
});
