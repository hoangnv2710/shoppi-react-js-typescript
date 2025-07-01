import { getUsersAPI } from "@/services/api";
import { Table } from "antd";
import { useEffect } from "react";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const ManageUserPage = () => {
    useEffect(() => {
        const fetch = async () => {
            await getUsersAPI(1, 5);

        }
        const res = fetch();
        console.log(res)
    }, [])
    return (
        <div>

            <Table dataSource={dataSource} columns={columns} />;

        </div>
    )
}

export default ManageUserPage;