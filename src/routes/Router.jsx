import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import EditCardPage from "../pages/EditCardPage";
import ReRenderPage from "../pages/ReRenderPage/ReRenderPage";
import UseMemoPage from "../pages/ReRenderPage/UseMemoPage";
import RP1 from "../pages/RP1";
import RP2 from "../pages/RP2";
import ProtectedRoute from "../components/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import NestedRoutePage from "../pages/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import MenuPage from "../pages/MenuPage";
import RRDPage1 from "../pages/RRDPage1";
import RRDPage2 from "../pages/RRDPage2";
import ProtectedRouteState from "../guard/ProtectedRouteState";
import RegisterPage2 from "../pages/RegisterPage2/RegisterPage2";
import AboutPage from "../pages/AboutPage";
import CreateCardPage from "../pages/CreateCardPage";
import FavoritesPage from "../pages/FavoritesPage";
import MyCardPage from "../pages/MyCards";
import SandboxPage from "../pages/SandboxPage";
import CardProfile from "../pages/CardProfilePage";
import CreateCardForm from "../pages/CreateCardPage2";

//element={<ProtectedRoute element={<LogoutPage />} />}

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path="/register2" element={<RegisterPage2 />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path="/cardData/:id" element={<CardProfile />} />

      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route
        path={ROUTES.FAV}
        element={<ProtectedRoute element={<FavoritesPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/createcard"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardForm />}
          />
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<MyCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true || false}
            element={<SandboxPage />}
          />
        }
      />
      <Route path="/rrp" element={<ReRenderPage />} />
      <Route path="/usememo" element={<UseMemoPage />} />
      <Route path="/rp1" element={<RP1 />} />
      <Route path="/rp2" element={<RP2 />} />
      <Route path="/nr" element={<NestedRoutePage />}>
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
      </Route>
      <Route path="/menu-test" element={<MenuPage />} />
      <Route
        path="/rrd1"
        element={<ProtectedRouteState element={<RRDPage1 />} />}
      />
      <Route path="/rrd2" element={<RRDPage2 />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
