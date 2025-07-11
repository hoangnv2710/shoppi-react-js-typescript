import { useEffect, useState } from "react";
import { Button, Input, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { getProductsAPI } from "@/services/product.service";
import CreateProductModal from "./create.product";
import EditProductModal from "./edit.product";

type TParam = {
    current: number;
    pageSize: number;
    subParam?: TSubParam;
}
type TSubParam = {
    mainText?: string;
    category?: string;
}

type TSorter = {
    field?: string;
    order?: string;
}

const ManageProductPage = () => {
    const [data, setData] = useState<IProductDetail[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [subParams, setSubParam] = useState<TSubParam>({});
    const [params, setParams] = useState<TParam>({
        current: 1,
        pageSize: 5,
    })
    const [sorterField, setSorterField] = useState<TSorter>({});
    const [productToEdit, setProductToEdit] = useState<IProductDetail>();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // useEffect(() => {
    //     console.log(productToEdit)
    //     if (prevProduct != productToEdit) {
    //         setPrevProduct(productToEdit);
    //         setIsEditModalOpen(true);
    //     }
    // }, [productToEdit])


    const columns: TableProps<IProductDetail>['columns'] = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: 'id',
            render: (text, record) => <button style={{ cursor: "pointer", background: "transparent", border: "none", color: "blue" }}
                onClick={() => {
                    // recordP = record;
                    setProductToEdit({ ...record });
                    // console.log(recordP)
                    setIsEditModalOpen(true);
                }}
            >{text}</button>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: true,
            render: (text) => (text),
        },
        {
            title: 'Product name',
            dataIndex: 'mainText',
            key: 'name',
            sorter: true,
            render: (text) => (text),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            render: (text) => <div>{
                Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                }).format(text)}</div>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true,
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
            render: (text) => (text ? (text) : (0)),
            sorter: true,
        },

    ];

    const handleSearch = () => {
        setParams({ ...params, current: 1, subParam: subParams });
    };

    const clearSearch = () => {
        setSubParam({});
        setParams({ ...params, subParam: undefined });
    }

    const onChangePage: TableProps<IProductDetail>['onChange'] = (pagination, filters, sorter) => {
        // setParams((prev) => ({ ...prev, current: page, pageSize: pageSize }))
        if (pagination.current && pagination.pageSize) {
            const current = pagination.current;
            const pageSize = pagination.pageSize;
            setParams((prev) => ({ ...prev, current: current, pageSize: pageSize }))
        }
        if (sorter) {
            setSorterField({ field: sorter.field, order: sorter.order });
        }
    };

    const getQuery = () => {
        let query = `current=${params.current}&pageSize=${params.pageSize}`;
        if (params.subParam?.category) query += `&category=/${params.subParam.category}/i`;
        if (params.subParam?.mainText) query += `&mainText=/${params.subParam.mainText}/i`;
        if (sorterField.field) {
            const sorter = '&sort=' + (sorterField.order === "descend" ? "-" : "") + sorterField.field;
            query += sorter;
        }
        return query;
    }

    const fetchData = async () => {
        const res = await getProductsAPI(getQuery());
        if (res.data) {
            setData(res.data?.result);
            setTotal(res.data.meta.total);
        }
    }
    useEffect(() => {
        fetchData();
    }, [params.current, params.pageSize, params.subParam?.category, params.subParam?.mainText, sorterField.field, sorterField.order])

    return (
        <div>
            <Space>
                <Space.Compact size="large">
                    <Input
                        value={subParams.mainText}
                        onChange={(e) => setSubParam({ ...subParams, mainText: e.target.value })}
                        addonBefore={
                            <SearchOutlined
                                style={{ cursor: "pointer" }}
                                onClick={handleSearch}
                            />
                        }
                        placeholder="Product name"
                        onPressEnter={handleSearch}
                    />
                    <Input
                        value={subParams.category}
                        onChange={(e) => setSubParam({ ...subParams, category: e.target.value })}
                        onPressEnter={handleSearch}
                        placeholder="Category" />
                </Space.Compact>
            </Space>
            <Button type="primary" onClick={clearSearch}>Clear</Button>

            <CreateProductModal reloadData={fetchData} />
            <EditProductModal reloadData={fetchData} productData={productToEdit} setProductData={setProductToEdit} isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} />
            <Table<IProductDetail>
                columns={columns}
                dataSource={data} rowKey="_id"
                pagination={{
                    current: params.current,
                    pageSize: params.pageSize,
                    total: total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                    pageSizeOptions: [5, 10, 20, 50],


                }}
                onChange={onChangePage}
            />;
        </div>
    )
}

export default ManageProductPage;

