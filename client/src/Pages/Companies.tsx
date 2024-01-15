import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Table, Result, Skeleton, Spin } from 'antd';
import { Popup } from '../Components/Popup';
import { PlusCircleOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd';

type Props = {}

const Companies = (props: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false);

    interface companyType {
        _id: any,
        name: String,
        companyLegalNumber: Number,
        incorporationCountry?: String,
        website: String,
        sector: String,
        numberOfEmployees?: Number,
        revenue: Number,
        phone?: String
    }
    const deleteCompany = async (id: string) => {
        let res = await fetch('https://ete-technology-assignment-server.onrender.com/api/deleteCompany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        if (res.ok) {
            alert('Company deleted successfully')
            window.location.reload()
        } else {
            alert('Error while deleting company')
        }
    }

    const [companies, setCompanies] = useState<companyType[]>()

    const columns: TableProps<companyType>['columns'] = [
        {
            title: <DeleteOutlined />,
            dataIndex: '_id',
            key: 'delete',
            render: (_id) => <>{deleteLoading ? <Spin /> : <CloseOutlined style={{ color: 'red', fontSize: '14px', opacity: 0.7 }} onClick={() => {
                setDeleteLoading(true)
                deleteCompany(_id);
            }} />}</>

        },
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Legal Number',
            dataIndex: 'companyLegalNumber',
            key: 'companyLegalNumber',
        },
        {
            title: 'Incorporation Country',
            dataIndex: 'incorporationCountry',
            key: 'incorporationCountry',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'Sector',
            dataIndex: 'sector',
            key: 'sector',
        },
        {
            title: 'Number of Employees',
            dataIndex: 'numberOfEmployees',
            key: 'numberOfEmployees',
        },
        {
            title: 'Revenue $(Yearly)',
            dataIndex: 'revenue',
            key: 'revenue',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ]
    const { Option } = Select;

    const [form] = Form.useForm();

    const onFinish = (values: any) => {

        const addCompany = async () => {
            let res = await fetch('https://ete-technology-assignment-server.onrender.com/api/addCompany', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            let data = res.json();
            return data;
        }
        setLoading(true)

        addCompany()
            .then((res) => {
                alert('Company Added Successfully')
                window.location.reload();
            }).catch(err => { console.log(err); setLoading(false) })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getCompanies = async () => {
            await fetch('https://ete-technology-assignment-server.onrender.com/api/companies').then((res) => {

                res.json().then(data => {
                    setCompanies(data)
                    console.log(data)
                }
                )
            }).catch((err) => { console.log(err); })

        }
        getCompanies()
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: '6em' }}>

                <Button onClick={() => setOpen(true)} type="primary" htmlType="submit" style={{ backgroundColor: '#4B49AC', width: 200, height: 50, justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '18px' }}>
                    <PlusCircleOutlined style={{ fontSize: '18px' }} />ADD COMPANY
                </Button>
                {open ? <Popup closePopup={() => setOpen(false)}>
                    <div style={{ padding: '1em' }}>
                        {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin size='large' />
                        </div> : <Form
                            name="add-company"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ message: 'Please input a company name!' }, { required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Company Legal Number"
                                name="companyLegalNumber"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Incorporation Country"
                                name="incorporationCountry"
                                rules={[{ message: 'Please input a incorporationCountry' }, { required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Website"
                                name="website"
                                rules={[{ message: 'Please input a company website!' }, { required: true }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select a sector"
                                    allowClear
                                >
                                    <Option value="Clothing">Clothing</Option>
                                    <Option value="Technology">Technology</Option>
                                    <Option value="Industry">Industry</Option>
                                    <Option value="Education">Education</Option>
                                    <Option value="Foods">Foods</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Number of Employees"
                                name="numberOfEmployees"
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Revenue(Yearly)"
                                name="revenue"
                                rules={[{ required: true }]}
                            >
                                <InputNumber addonAfter="$" defaultValue={0} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 64 }}>
                                <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4B49AC' }}>
                                    ADD COMPANY
                                </Button>
                            </Form.Item>
                        </Form>}
                    </div>
                </Popup> : null}
                <br />
                <div >
                    {companies ? <Table columns={columns} dataSource={companies} /> : <Skeleton active style={{ width: '52em' }} />}

                </div>
            </div>
        </div>
    )
}
export default Companies