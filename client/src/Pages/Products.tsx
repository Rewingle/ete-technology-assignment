import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Table, Spin, Skeleton } from 'antd';
import { Popup } from '../Components/Popup';
import { PlusCircleOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd';

type Props = {}

const Companies = (props: Props) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [selectCompanies, setSelectCompanies] = useState<companyType[]>()
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false);

    interface productType {
        _id: any,
        name: String,
        producedBy: String,
        producedId: any,
        sector: String,
        price: Number,
        amountUnit: Number
    }
    interface companyType {
        _id: any,
        name: String,
        sector: String,
        location?: String,
        founded?: Number,
        numberOfEmployees?: Number,
        revenue: Number,
        phone?: String,
    }

    const [products, setProducts] = useState<productType[]>()

    const deleteProduct = async (id: string) => {
        let res = await fetch('http://localhost:5000/api/deleteProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        if (res.ok) {
            alert('Product deleted successfully')
            window.location.reload()
        } else {
            alert('Error while deleting company')
        }
    }
    const columns: TableProps<productType>['columns'] = [
        {
            title: <DeleteOutlined />,
            dataIndex: '_id',
            key: 'delete',
            render: (_id) => <>{deleteLoading ? <Spin /> : <CloseOutlined style={{ color: 'red', fontSize: '14px', opacity: 0.7 }} onClick={() => {
                setDeleteLoading(true)
                deleteProduct(_id);
            }} />}</>

        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Company',
            dataIndex: 'producedBy',
            key: 'producedBy',
        },
        {
            title: 'Sector',
            dataIndex: 'sector',
            key: 'sector',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Amount Unit',
            dataIndex: 'amountUnit',
            key: 'amountUnit',
        }

    ]
    const { Option } = Select;

    const getCompanies = async () => {
        await fetch('http://localhost:5000/api/companies').then((res) => {

            res.json().then(data => {
                setSelectCompanies(data)

            }
            )
        }).catch((err) => { console.log(err); })

    }

    const onFinish = (values: any) => {

        const producedBy = JSON.parse(values.producedBy).companyName
        const producedId = JSON.parse(values.producedBy).companyId
        const addProduct = async () => {
            let res = await fetch('http://localhost:5000/api/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    producedBy: producedBy,
                    producedId: producedId,
                    sector: values.sector,
                    price: values.price,
                    amountUnit: values.amountUnit
                })
            })
            let data = res.json();
            return data;
        }
        setLoading(true)

        addProduct()
            .then((res) => {
                alert('Product Added Successfully')
                window.location.reload();
            }).catch(err => { console.log(err); setLoading(false) })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getProducts = async () => {
            await fetch('http://localhost:5000/api/products').then((res) => {

                res.json().then(data => {
                    setProducts(data)
                    console.log(data)
                }
                )
            }).catch((err) => { console.log(err); })

        }
        getProducts()
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ marginTop: '6em' }}>

                <Button onClick={() => { setOpen(true); getCompanies() }} type="primary" htmlType="submit" style={{ backgroundColor: '#F3797E', width: 200, height: 50, justifyContent: 'center', alignItems: 'center', display: 'flex', fontSize: '18px' }}>
                    <PlusCircleOutlined style={{ fontSize: '18px' }} />ADD PRODUCT
                </Button>
                {open ? <Popup closePopup={() => setOpen(false)}>
                    <div style={{ padding: '1em' }}>
                        {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin size='large' />
                        </div> : <Form
                            name="add-product"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Product name"
                                name="name"
                                rules={[{ message: 'Please input a product name!' }, { required: true }]}
                            >
                                <Input />
                            </Form.Item>



                            <Form.Item name="producedBy" label="Company" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select a Company"
                                    allowClear
                                >
                                    {selectCompanies ? <>{selectCompanies.map((company) => (
                                        <Option value={JSON.stringify({ companyName: company.name, companyId: company._id })}>{company.name}</Option>
                                    ))
                                    }</> : null}
                                </Select>
                            </Form.Item>

                            <Form.Item name="sector" label="Category" rules={[{ required: true }]}>
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
                                label="Price"
                                name="price" rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Amount Unit"
                                name="amountUnit" rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 64 }}>
                                <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#4B49AC' }}>
                                    ADD PRODUCT
                                </Button>
                            </Form.Item>
                        </Form>}
                    </div>
                </Popup> : null}
                <br />
                {products ? <Table columns={columns} dataSource={products} /> : <Skeleton active style={{ width: '52em' }} />}

            </div>
        </div>
    )
}
export default Companies