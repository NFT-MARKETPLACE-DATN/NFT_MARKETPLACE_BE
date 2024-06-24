import app from './app'
// import mintNFT from "servers/testMintNFT";
// import { main } from "servers/tranferSOL";
import * as userService from './services/userService';
import * as nftService from './services/nftService';
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
 * /api/account/login:
 *   get:
 *     tags:
 *     - account
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
 *       500:
 *         description: Internal Server Error
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
 *                    default: Server Error
 */
app.get('/api/account/login', async (req, res) => {
  let address = req.query.address?.toString()
  if (address) {
    const result = await userService.userLogin(address);
    if(result?.success){
      res.status(200).json({ 
        success: true, 
        message: 'Login successful',
        data:result.data
      })
    }else{
      res.status(500).json({ 
        success: false, 
        message: result.message,
        data:null 
      })
    }

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
 *        - symbol
 *        - image
 *        - description
 *        - attribute
 *        - mintAddress
 *        - tokenAccount
 *      properties:
 *        nftName:
 *          type: string
 *        symbol:
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
 * /api/nft/create-nft:
 *   post:
 *     tags:
 *     - nftApi
 *     summary: Create NFT by Used 
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter userId.
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
 *                  message:
 *                     type: string
 *                     default: Wrong 
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
 *       500:
 *         description: Internal Server Error
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
 *                    default: Server Error
 */
app.post('/api/nft/create-nft', async (req, res) => {
  const data = req.body;
// console.log(data);
// await nftInfo.addNewNft(1,data);
  let userID = Number(req.query.userId);
  if (userID) {
    const result = await nftService.createNft(userID,data);
    if(result.success){
      res.status(200).json({ 
        success: true, 
        message: result.message,
      })
    }else{
      res.status(500).json({ 
        success: false, 
        message: result.message,
      })
    }
  
  } else {
    res.status(400).json({ success: false, message: 'Address is required' })
  }
})

/**
 * @openapi
 * /api/nft/get-nft-by-id:
 *   get:
 *     tags:
 *     - nftApi
 *     summary: Get NFT by Id 
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: nftId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter nftId.
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
 *       500:
 *         description: Internal Server Error
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
 *                    default: Server Error
 */
app.get('/api/nft/get-nft-by-id', async (req, res) => {
  let nftID = Number(req.query.nftId);
  if (nftID) {
    const result = await nftService.getNftByID(nftID);
    if(result.success){
      res.status(200).json({ 
        success: true, 
        message: result.message,
        data : result.data
      })
    }else{
      res.status(500).json({ 
        success: false, 
        message: result.message,
        data : null
      })
    }

  } else {
    res.status(400).json({ success: false, message: 'Address is required' })
  }
})
/**
 * @openapi
 * components:
 *   schemas:
 *     NFT:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         is_delete:
 *           type: boolean
 *     ListedNFT:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         price:
 *           type: number
 *         is_delete:
 *           type: boolean
 *         nftID:
 *           $ref: '#/components/schemas/NFT'
 */
/**
 * @openapi
 * /api/nft/get-nft-listed:
 *   get:
 *     tags:
 *     - nftApi
 *     summary: Used for login.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search keyword
 *       - in: query
 *         name: pageIndex
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Enter page index.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Enter page size.
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC","DESC"]
 *           default: "DESC"
 *         description: The order direction
 *       - in: query
 *         name: isTrending
 *         schema:
 *           type: boolean
 *           default: false
 *         description: List NFT by trending
 *     responses:
 *       200:
 *         description: A list of NFTs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ListedNFT'
 *                 total:
 *                   type: integer
 *                 pageIndex:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
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
 *       500:
 *         description: Internal Server Error
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
 *                    default: Server Error
 */
app.get('/api/nft/get-nft-listed', async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = (req.query.search as string) || '';
  const order = (req.query.order as string) === 'ASC' ? 'ASC' : 'DESC';
  const isTrending = req.query.isTrending === 'true' ? true : false;
  
  const result = await nftService.getNftListed(pageIndex,pageSize,order,search,isTrending)
  // console.log(result);
  
  res.status(200).json({ 
    success: true, 
    message:"dsads",
    data : result //JSON.parse(result)
  })
})
