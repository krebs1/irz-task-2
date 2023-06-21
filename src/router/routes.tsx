import WorksPage from "../pages/WorksPage/WorksPage";
import DesignersPage from "../pages/DesignersPage/DesignersPage";
import MainLayout from "../layouts/MainLayout";
import ManagementPage from "../pages/ManagementPage/ManagementPage";
import WorkPage from "../pages/WorkPage/WorkPage";
import WithoutSearchLayout from "../layouts/WithoutSearchLayout";
import NotesPage from "../pages/NotesPage/NotesPage";

export const routes = [
    {
        layout: <MainLayout/>,
        routes: [
            {
                path: '/',
                element: <WorksPage/>
            },
            {
                path: '/works',
                element: <WorksPage/>
            },
            {
                path: '/designers',
                element: <DesignersPage/>
            },
            {
                path: '/management',
                element: <ManagementPage/>
            },
            {
                path: '/notes',
                element: <NotesPage/>
            },
        ]
    },
    {
        layout: <WithoutSearchLayout/>,
        routes: [
            {
                path: '/works/:id',
                element: <WorkPage/>
            },
        ]
    }
]