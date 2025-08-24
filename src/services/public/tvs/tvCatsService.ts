import myFetchServer from '@/services/myFetchServer'; 

interface ICategory {
    id: number;
    title: string;
    slug: string;
    [key: string] : any
}

interface CategoriesResponse {
    status: 'success' | 'error';
    categories?: ICategory[];
    msg?: string,
}




export const getTvCats = async (): Promise<CategoriesResponse> => {

    return await myFetchServer('/tv-cats', {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'GET' 
        },
    );
}




export const singleCategory = async(id:string) =>{

    return await myFetchServer(`/admin/tv-cats/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        },
    );
}




