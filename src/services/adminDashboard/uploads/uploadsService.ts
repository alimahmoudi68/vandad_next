import myFetchServer from '@/services/myFetchServer'; 

interface NewUploadResponse {
    status: 'success' | 'error';
    upload? :{
        id: string ,
        title : string ,
        location: string,
        thumb : string,
        bucket : string 
    }
    msg?: string,
}

interface DeleteUploadResponse {
    status: 'success' | 'error';
    msg?: string,
}

export const newUpload = async (formData: FormData): Promise<NewUploadResponse> => {

    return await myFetchServer('/admin/uploads', {
        body : formData,
        method : 'POST' 
        },
    );
}


export const deleteUpload = async (id: number): Promise<DeleteUploadResponse> => {

    return await myFetchServer(`/admin/uploads/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method : 'DELETE' 
        },
    );
}