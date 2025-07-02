import { getUsersAPI } from "@/services/api";
import { useEffect, useState } from "react";
import { Table } from 'antd';
import type { TableProps } from 'antd';

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


const ManageUserPage = () => {
    const [data, setData] = useState<IUserDetail[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5)

    const onChangePage = (page: number, pageSize: number) => {
        setCurrent(page);
        setPageSize(pageSize);

    };

    useEffect(() => {
        const fetch = async () => {
            const res = await getUsersAPI(current, pageSize);
            if (res.data) {
                setData(res.data?.result);
                setTotal(res.data.meta.total);
            }
        }
        fetch();
    }, [current, pageSize])
    console.log(data);
    return (
        <div>
            <Table<IUserDetail>
                columns={columns}
                dataSource={data} rowKey="_id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
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