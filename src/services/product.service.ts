import { IPageginate, IResponse } from '@/types/api';
import axios from 'services/axios.customize'

const getProductsAPI = async (query: string) => {
    const url = `/api/v1/book?${query}`;
    const response = await axios.get<IResponse<IPageginate<IProductDetail[]>>>(url);
    return response.data;
}

export { getProductsAPI }