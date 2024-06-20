import * as userRepository from "../repositories/userInfoRepository";


export const userLogin = async (address:string)=>{
    try {
       let checkUser = await userRepository.checkUser(address);
       let balanceSOL = null;
       if(!checkUser){
        checkUser =  await userRepository.addNewUser(address);
        // console.log(checkUser);
       }else{
        balanceSOL = await userRepository.balanceSOL(address);
        // console.log(balanceSOL);
        if(checkUser.balance == balanceSOL) console.log("fasdfasfasdfsdf");
        else{
            const updateBalance = await userRepository.updateUserBalance(address,balanceSOL);
            console.log(updateBalance);
        }
      
       }
       const user ={
        id: checkUser.id,
        is_delete: false,
        created_date: checkUser.created_date,
        modified_date: checkUser.modified_date,
        username: checkUser.username,
        address: checkUser.address,
        balance: balanceSOL ? balanceSOL : checkUser.balance,
        image: checkUser.image,
        background: checkUser.background,
        roleID: checkUser.role_id
       }

      return user;
    } catch (error) {
        console.log(error);
        
    }
}