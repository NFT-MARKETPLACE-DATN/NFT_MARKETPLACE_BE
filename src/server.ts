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
  res.status(200).json({
    success: true, 
    message: "Oke",
    data:null 
  })
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
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
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
 * /api/account/update-background:
 *   post:
 *     tags:
 *     - account
 *     summary: Update user background.
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
 *             type: object
 *             properties:
 *               background: 
 *                 type: string
 *                 description:  User background
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.post('/api/account/update-background', async (req, res) => {
  let userID = Number(req.query.userId);
  let background = req.body.background?.toString();
  if (userID && background) {
    const result = await userService.userUpdateBackground(userID,background);
    if(result?.success){
      res.status(200).json({ 
        success: true, 
        message: 'Update Background successful',
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
 *        - transaction
 *        - metadataUrl
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
 *        metadataUrl:
 *          type: string
 *        transaction:
 *          type: string
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
 *                    type: boolean
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
 *                    type: boolean
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
 *                    type: boolean
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
 * components:
 *  schemas:
 *    list-nft:
 *      type: object
 *      required:
 *        - nftID
 *        - price
 *        - isList
 *        - isTrending
 *        - transaction
 *      properties:
 *        nftID:
 *          type: number
 *        price:
 *          type: number
 *        isList:
 *          type: boolean
 *          default: true 
 *        isTrending:
 *          type: boolean
 *          default: false 
 *        transaction:
 *          type: string
 * 
 */
/**
 * @openapi
 * /api/nft/sync-nft-market:
 *   post:
 *     tags:
 *     - nftApi
 *     summary: List Nft to market
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter userId.
 *       - in: query
 *         name: isAction
 *         required: true
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Enter action.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/list-nft'
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.post('/api/nft/sync-nft-market', async (req, res) => {
  const data = req.body;
  const isAction = req.query.isAction === 'true' ? true : false;
  let userID = Number(req.query.userId);
  if (userID) {
    const result = await nftService.syncNftToMarket(data,userID,isAction);
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
  }else{
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
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
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
 *         nftInfo:
 *           $ref: '#/components/schemas/NFT'
 */
/**
 * @openapi
 * /api/nft/get-nft-listed:
 *   get:
 *     tags:
 *     - nftApi
 *     summary: Get NFT listed in market.
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
 *         description: List NFT in market by trending
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
 *                    type: boolean
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
 *                    type: boolean
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
  if(result){
    res.status(200).json({ 
      success: true, 
      message:"dsads",
      data : result //JSON.parse(result)
    })
  }else{
    res.status(400).json({ success: false, message: 'Get Nft fail' })
  }

})

/**
 * @openapi
 * /api/nft/get-nft-by-user:
 *   get:
 *     tags:
 *     - nftApi
 *     summary: Get NFT by user.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter userId.
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
 *         name: isListed
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Nft listed in ArtChain market
 *       - in: query
 *         name: isCreated
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Nft created by user
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
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.get('/api/nft/get-nft-by-user', async (req, res) => {
  const userID = Number(req.query.userId);
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = (req.query.search as string) || '';
  const order = (req.query.order as string) === 'ASC' ? 'ASC' : 'DESC';
  const isListed = req.query.isListed === 'true' ? true : false;
  const isCreated = req.query.isCreated === 'true' ? true : false;
  if(userID){
    const result = await nftService.getNftByUser(userID,pageIndex,pageSize,order,search,isListed,isCreated)
    res.status(200).json({ 
      success: true, 
      message:"dsads",
      data : result //JSON.parse(result)
    })
  }else{
    res.status(400).json({ success: false, message: 'Address is required' })
  }
  // console.log(result);
  

})

/**
 * @openapi
 * components:
 *  schemas:
 *    action-transaction:
 *      type: object
 *      required:
 *        - txID
 *        - actionName
 *        - created
 *        - nftName
 *        - nftImage
 *      properties:
 *        txID:
 *          type: string
 *        actionName:
 *          type: number
 *        created:
 *          type: string
 *        nftName:
 *          type: string
 *        nftImage:
 *          type: string
 */
/**
 * @openapi
 * /api/nft/get-transaction:
 *   get:
 *     tags:
 *     - account
 *     summary: Get Transaction By User.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter userId.
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
 *         name: search
 *         schema:
 *           type: number
 *         description: Type action
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC","DESC"]
 *           default: "DESC"
 *         description: The order direction
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
 *                     $ref: '#/components/schemas/action-transaction'
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
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.get('/api/nft/get-transaction', async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const filter = Number(req.query.search);
  const order = (req.query.order as string) === 'ASC' ? 'ASC' : 'DESC';
  const userID = Number(req.query.userId);
  
  const result = await userService.getTransactionUser(userID,pageIndex,pageSize,order,filter)
  // console.log(result);
  
  res.status(200).json({ 
    success: true, 
    message:"dsads",
    data : result //JSON.parse(result)
  })
})

/**
 * @openapi
 * /api/nft/transfer-nft:
 *   get:
 *     tags:
 *     - nftApi
 *     summary: Transfer NFT 
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: number
 *         description: Enter userId.
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
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.get('/api/nft/transfer-nft', async (req, res) => {
  let nftID = Number(req.query.nftId);
  const userID = Number(req.query.userId);
  if (nftID || userID) {

    const result = await nftService.transferNft(userID,nftID);
    // if(result.success){
      res.status(200).json({ 
        success: true, 
        // message: result.message,
        // data : result.data
      })
    // }else{
    //   res.status(500).json({ 
    //     success: false, 
    //     message: result.message,
    //     data : null
    //   })
    // }

  } else {
    res.status(400).json({ success: false, message: 'Address and NFT is required' })
  }
})

/**
 * @openapi
 * components:
 *  schemas:
 *    users:
 *      type: object
 *      required:
 *        - address
 *        - created
 *        - balance
 *        - isAdmin
 *        - nftCount
 *      properties:
 *        address:
 *          type: string
 *        balance:
 *          type: number
 *        created:
 *          type: string
 *        isAdmin:
 *          type: boolean
 *        nftCount:
 *          type: number
 */
/**
 * @openapi
 * /api/admin/get-user:
 *   get:
 *     tags:
 *     - admin
 *     summary: Get User for adminpage.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
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
 *         name: search
 *         schema:
 *           type: string
 *         description: search for name
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: ["ASC","DESC"]
 *           default: "DESC"
 *         description: The order direction
 *     responses:
 *       200:
 *         description: A list of user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/users'
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
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.get('/api/admin/get-user', async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const filter = (req.query.search as string);
  const order = (req.query.order as string) === 'ASC' ? 'ASC' : 'DESC';
 
  const result= await userService.getUserbyAdmin(pageIndex,pageSize,order,filter)
  // const result = await userService.getTransactionUser(userID,pageIndex,pageSize,order,filter)
  // console.log(result);
  if(result){
    res.status(200).json({ 
      success: true, 
      message:"Success",
      data : result //JSON.parse(result)
    })
  }else{
    res.status(400).json({ 
      success: false, 
      message:" Fail to get record",
      data : null //JSON.parse(result)
    })
  }

})

/**
 * @openapi
 * /api/admin/update-user:
 *   post:
 *     tags:
 *     - admin
 *     summary: Update User Role.
 *     description: Returns a simple status message to indicate that the service is running.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *                userId: 
 *                  type: number
 *                  description:  User 
 *                isRole: 
 *                  type: number
 *                  description:  Role
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.post('/api/admin/update-user', async (req, res) => {
  const data = req.body;

  const result= await userService.updateRoleUser(data.userId,data.isRole)
  if(result.success){
    res.status(200).json({ 
      success: true, 
      message:result.message,
      // data : result //JSON.parse(result)
    })
  }else{
    res.status(400).json({ 
      success: false, 
      message:result.message,
      // data : result //JSON.parse(result)
    })
  }

})


/**
 * @openapi
 * components:
 *  schemas:
 *    nfts:
 *      type: object
 *      required:
 *        - nftId
 *        - userAddress
 *        - nftAddress
 *        - nftName
 *        - nftImage
 *        - isListed
 *        - isTrending
 *        - price
 *        - created
 *      properties:
 *        nftId:
 *          type: number
 *        userAddress:
 *          type: string
 *        nftAddress:
 *          type: string
 *        nftName:
 *          type: string
 *        nftImage:
 *          type: string
 *        isListed:
 *          type: number
 *        isTrending:
 *          type: number
 *        price:
 *          type: number
 *        created:
 *          type: string
 */
/**
 * @openapi
 * /api/admin/get-nfts:
 *   get:
 *     tags:
 *     - admin
 *     summary: Get nft for adminpage.
 *     description: Returns a simple status message to indicate that the service is running.
 *     parameters:
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
 *         name: search
 *         schema:
 *           type: string
 *         description: search for name
 *       - in: query
 *         name: isList
 *         schema:
 *           type: boolean
 *           default: false
 *         description: List NFT in market 
 *     responses:
 *       200:
 *         description: A list of user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/nfts'
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
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.get('/api/admin/get-nfts', async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const filter = (req.query.search as string);
  const isList = req.query.isList === 'true' ? true : false;
  const result = await nftService.getNftsByAdmin(pageIndex,pageSize,filter,isList)
  // const result= await userService.getUserAdmin(pageIndex,pageSize,order,filter)
  // const result = await userService.getTransactionUser(userID,pageIndex,pageSize,order,filter)
  // console.log(result);
  if(result){
    res.status(200).json({ 
      success: true, 
      message:"Success",
      data : result //JSON.parse(result)
    })
  }else{
    res.status(200).json({ 
      success: true, 
      message:" Fail to get record",
      data : null //JSON.parse(result)
    })
  }

});


/**
 * @openapi
 * /api/admin/update-nft-is-trending:
 *   post:
 *     tags:
 *     - admin
 *     summary: Update User Role.
 *     description: Returns a simple status message to indicate that the service is running.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nftId: 
 *                  type: number
 *                  description:  Nft 
 *                isTrending: 
 *                  type: boolean
 *                  description:  isTrending
 *     responses:
 *       200:
 *         description: Successful, includes the JSON format from the body of the response (each API may differ)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    default: true
 *       400:
 *         description: The parameters used for the API are incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
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
 *                    type: boolean
 *                    default: false
 *                  message:
 *                    type: string
 *                    default: Server Error
 */
app.post('/api/admin/update-nft-is-trending', async (req, res) => {
  const data = req.body;

  const result= await nftService.updateIsTrendingNft(data.nftId,data.isTrending)
  if(result.success){
    res.status(200).json({ 
      success: true, 
      message:result.message,
      // data : result //JSON.parse(result)
    })
  }else{
    res.status(400).json({ 
      success: false, 
      message:result.message,
      // data : result //JSON.parse(result)
    })
  }

})