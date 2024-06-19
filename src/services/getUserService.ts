import * as userAccountRepository from "../repositories/userInfoRepository";


export const getUserService = async (address:string)=>{
    try {
       const checkUesr = await userAccountRepository.checkUesr(address);
       if(!checkUesr){
       const info =  await userAccountRepository.addNewUser(address);
       console.log(info);
       
       }else{
        console.log(checkUesr);
       }
      return checkUesr;
    // console.log(address);
    
        
    } catch (error) {
        console.log(error);
        
    }
}