import React from 'react';
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes";

const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map((route)=>{
                    return(
                        <Route element={route.layout}
                               key={route.layout.key}

                        >
                            {
                                route.routes.map((route)=>{
                                    return(
                                        <Route path={route.path}
                                               element={route.element}
                                               key={route.path}
                                        />
                                    );
                                })
                            }
                        </Route>
                    );
                })
            }
        </Routes>
    );
};

export default AppRouter;