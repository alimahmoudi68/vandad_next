export const showNameOrPhone  = (name: string , phone: string) =>{
    

    if(name == undefined || phone == undefined){
        return 'Deleted User';
    }

    if(name.length > 0){
        return name ;
    }else{
        return `${phone.substr(9,10)}...${phone.substr(0,6)}`;
    }
}