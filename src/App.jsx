import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";

const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                richColors={false}
                expand={false}
                duration={3000}
                visibleToasts={3}
                offset={{
                    top: 80,
                }}
                gap={12}
            />
            <AppRoutes />
        </>
    );
};

export default App;
