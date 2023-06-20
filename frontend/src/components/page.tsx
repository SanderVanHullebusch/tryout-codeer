import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { Container } from "./container/container";

interface Props {
    children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
    return (
        <Layout>
            <Header>
                <Container>
                    <Link to={"/"}>
                        <img src={logo} style={{ width: '150px' }} className="App-logo" alt="logo" />
                    </Link>
                </Container>
            </Header>
            <Content style={{ height: "100%", padding: "2rem 0" }}>
                <Container>
                    {children}
                </Container>
            </Content>
        </Layout>
    );
};
