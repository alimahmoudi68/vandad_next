export const showNameOrPhone  = (name: string , phone: string) =>{
    
    if(name && name.length > 0){
        return name ;
    }else{
        if(phone && phone.length > 0){
            return `${phone?.substr(9,10)}...${phone?.substr(0,6)}`;
        }else{
            return '-';
        }
    }
}

export const showNameOrPhoneComplete  = (name: string , phone: string) =>{
    
    if(name && name.length > 0){
        return name ;
    }else{
        return phone;
    }
}