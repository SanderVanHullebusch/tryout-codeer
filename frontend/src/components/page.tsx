import { Layout, Button, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import logo from "../logo.png";
import { Container } from "./container/container";
import { AddModal } from "./pokemons/addModal";

interface Props {
    children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleCancelAddModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Layout>
                <Header style={{padding: '0', position: 'sticky', top: 0, zIndex: 1}}>
                    <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to={"/"}>
                            <img src={logo} style={{ width: '150px' }} className="App-logo" alt="logo" />
                        </Link>
                        <Tooltip title="Add new pokemon">
                            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} />
                        </Tooltip>
                    </Container>
                </Header>
                <Content style={{ height: "100%", padding: "1.5rem 0" }}>
                    <Container>
                        {children}
                    </Container>
                </Content>
            </Layout>

            <AddModal isModalOpen={isModalOpen} onCancel={handleCancelAddModal} />
        </>
    );
};
