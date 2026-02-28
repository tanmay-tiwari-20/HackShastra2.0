import React from "react";
import Navbar from "@/components/Navbar";

const Page = () => {
    return (
        <div className="relative">
            <Navbar isReady={true} />
            <div className="pt-24 min-h-screen flex items-center justify-center">
                <h1>Events Page</h1>
            </div>
        </div>
    );
};

export default Page;
