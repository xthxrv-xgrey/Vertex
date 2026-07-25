import React from "react";
import { Outlet } from "react-router";
import Header from "../components/ui/Header.jsx";
import Footer from "../components/ui/Footer.jsx";

const AppLayout = () => {
    return (
        <>
            <Header />
            <main className="bg-background pt-[10vh] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
