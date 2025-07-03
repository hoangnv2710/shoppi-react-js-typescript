import { getUsersAPI } from "@/services/api";
import { useEffect, useState } from "react";
import { Button, Input, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

const columns: TableProps<IUserDetail>['columns'] = [
    {
        title: 'Id',
        dataIndex: '_id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone',
    },
];

type TParam = {
    current: number;
    pageSize: number;
    subParam?: TSubParam;
}
type TSubParam = {
    email?: string;
    fullName?: string;
    phone?: string;
}
const ManageUserPage = () => {
    const [data, setData] = useState<IUserDetail[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [subParams, setSubParam] = useState<TSubParam>({});
    const [params, setParams] = useState<TParam>({
        current: 1,
        pageSize: 5,
    })

    const handleSearch = () => {
        setParams({ ...params, subParam: subParams });
    };

    const clearSearch = () => {
        setSubParam({});
        handleSearch();
    }

    const onChangePage = (page: number, pageSize: number) => {
        setParams((prev) => ({ ...prev, current: page, pageSize: pageSize }))
    };

    const getQuery = () => {
        let query = `current=${params.current}&pageSize=${params.pageSize}`;
        if (params.subParam?.email) query += `&email=/${params.subParam.email}/i`;
        if (params.subParam?.phone) query += `&phone=/${params.subParam.phone}/i`;
        if (params.subParam?.fullName) query += `&fullName=/${params.subParam.fullName}/i`;
        return query;
    }

    const fetchData = async () => {
        const res = await getUsersAPI(getQuery());
        if (res.data) {
            setData(res.data?.result);
            setTotal(res.data.meta.total);
        }
    }
    useEffect(() => {
        fetchData();
    }, [params.current, params.pageSize, params.subParam?.email, params.subParam?.phone, params.subParam?.fullName])

    return (
        <div>
            <Space>
                <Space.Compact size="large">
                    <Input
                        value={subParams.fullName}
                        onChange={(e) => setSubParam({ ...subParams, fullName: e.target.value })}
                        addonBefore={
                            <SearchOutlined
                                style={{ cursor: "pointer" }}
                                onClick={handleSearch}
                            />
                        }
                        placeholder="Full name"
                    />
                    <Input
                        value={subParams.email}
                        onChange={(e) => setSubParam({ ...subParams, email: e.target.value })}
                        placeholder="email" />
                    <Input
                        value={subParams.phone}
                        onChange={(e) => setSubParam({ ...subParams, phone: e.target.value })}
                        placeholder="phone number" />
                </Space.Compact>
            </Space>

            <Button type="primary" onClick={clearSearch}>Clear</Button>

            <Table<IUserDetail>
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
                    onChange: onChangePage,
                }}
            />;
        </div>
    )
}

export default ManageUserPage;

