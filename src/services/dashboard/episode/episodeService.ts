import myFetchServer from '@/services/myFetchServer'; 

interface INewEpisode {
    title: string,
    content: string,
    price: number,
    date: string,
}

interface IEpisode {
    id: number,
    title: string,
    content: string,
    price: number,
    date: string,
    created_at: string,
    upated_at: string,
}

interface NewEpisodeResponse {
    status: 'success' | 'error';
    episode?: IEpisode;
    message?: string,
}


export const newEpisode = async (formData: INewEpisode): Promise<NewEpisodeResponse> => {

    return await myFetchServer('/admin/episodes', {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'POST' 
        },
    );
}


export const removeEpisode = async(id:number) =>{

    return await myFetchServer(`/admin/episodes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}


export const updateEpisode = async (id: number , formData: INewEpisode): Promise<NewEpisodeResponse> => {

    return await myFetchServer(`/admin/episodes/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
        method : 'PUT' 
        },
    );
}
