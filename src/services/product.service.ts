import { IPageginate, IResponse } from '@/types/api';
import axios from 'services/axios.customize'

const getProductsAPI = async (query: string) => {
    const url = `/api/v1/book?${query}`;
    const response = await axios.get<IResponse<IPageginate<IProductDetail[]>>>(url);
    return response.data;
}

const uploadImage = async (formData: FormData) => {
    const url = '/api/v1/file/upload';
    const response = await axios.post<IResponse<{ fileUploaded: string }>>(url,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "upload-type": "book"
            }

        });
    return response.data;
}
export { getProductsAPI, uploadImage }