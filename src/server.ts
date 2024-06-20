import app from './app'
// import mintNFT from "servers/testMintNFT";
// import { main } from "servers/tranferSOL";
import * as userService from './services/userService'
import * as nftInfo from "./repositories/nftInfoRepository"
const PORT = 3100

app.listen(PORT, async () => {
  console.log(`Server is running on port: ${PORT}`)
  console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`)
})

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
app.get('/api/health-check', async (req, res) => {
  res.status(200).json('Oksádfasdfssssssss')
})

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
app.get('/api/mint-nft', async (req, res) => {
  // await mintNFT();
  // await main();
  res.status(200).json('Oksádfasdsssssfssss')
})

/**
 * @openapi
 * /api/login:
 *   get:
 *     tags:
 *     - api
 *     summary: Used for login.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Enter address.
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: bool
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: bool
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Wrong username or password
 */
app.get('/api/login', async (req, res) => {
  let address = req.query.address?.toString()
  if (address) {
    const result = await userService.userLogin(address)
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      userInfo:result
    }
  )
  } else {
    res.status(400).json({ success: false, message: 'Address is required' })
  }
})

/**
 * @openapi
 * components:
 *  schemas:
 *    create-nft:
 *      type: object
 *      required:
 *        - nftName
 *        - image
 *        - description
 *        - attribute
 *        - mintAddress
 *        - tokenAccount
 *      properties:
 *        nftName:
 *          type: string
 *        image:
 *          type: string
 *        description:
 *          type: string
 *        attribute:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *              trait_type:
 *                type: string
 *              value:
 *                type: string
 *        mintAddress:
 *          type: string
 *        tokenAccount:
 *          type: string
 * 
 */
/**
 * @openapi
 * /api/create-nft:
 *   post:
 *     tags:
 *     - api
 *     summary: Create NFT by Used 
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter user_id.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/create-nft'
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: bool
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: bool
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Wrong 
 */
app.post('/api/create-nft', async (req, res) => {
  const data = req.body;
// console.log(data);
await nftInfo.addNewNft(1,data)
  // let address = req.query.address?.toString()
  // if (address) {
  //   const result = await userService.getUserService(address)
    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      // userInfo:result
    }
  )
  // } else {
  //   res.status(400).json({ success: false, message: 'Address is required' })
  // }
})
