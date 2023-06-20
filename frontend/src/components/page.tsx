import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

interface Props {
    children: ReactNode;
}

export const Page: FC<Props> = ({ children }) => {
    return (
        <Layout>
            <Header>
                <Link to={"/"}>
                    <img src={logo} style={{ width: '150px' }} className="App-logo" alt="logo" />
                </Link>
            </Header>
            <Content style={{ height: "100%" }}>{children}</Content>
        </Layout>
    );
};
