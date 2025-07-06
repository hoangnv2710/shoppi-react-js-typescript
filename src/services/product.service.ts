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

const createProduct = async (thumbnail: string, slider: string[], mainText: string, author: string, price: number, quantity: number, category: string) => {
    const url = '/api/v1/book';
    const response = await axios.post<IResponse<IProductDetail>>(url, { thumbnail, slider, mainText, author, price, quantity, category })
    return response.data;
}

const updateProduct = async (id: string, data: IProduct) => {
    const url = `/api/v1/book/${id}`;
    const response = await axios.put<IResponse<any>>(url, { ...data })
    return response.data;

}


const deleteProduct = async (id: string) => {
    const url = `/api/v1/book/${id}`;
    const response = await axios.delete<IResponse<any>>(url)
    return response.data;

}


export { getProductsAPI, uploadImage, createProduct, updateProduct, deleteProduct }