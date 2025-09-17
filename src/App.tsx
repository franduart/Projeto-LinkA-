import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Admin } from "./pages/admin"
import {Login} from './pages/login'
import { Networks } from "./pages/networks"
import { Private } from "./pages/routes/private"
import { NotFound } from "./pages/notfound"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/admin',
    element: <Private><Admin/></Private>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin/networks',
    element: <Private><Networks/></Private>
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export {router};
