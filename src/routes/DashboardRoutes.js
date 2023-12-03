import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/home/home.component";
import { useAuth } from "../context/auth.context";
import ExplorePage from "../pages/explore/explore.component";
import ProfilePage from "../pages/profile/profile.component";

const DashboardRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/explore" element={<ExplorePage />} />
            <Route path="/profile/:userID" element={<ProfilePage />} />
            {/* <Route exact path="/bookmarks" element={<BookmarksPage />} />
            <Route exact path="/notifications" element={<NotificationsPage />} />
            <Route exact path="/messages" element={<MessagesPage />} />
            <Route exact path="/groups" element={<GroupsPage />} /> */}

            {/* Redirect all unmatched routes to the homepage */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={
                isAuthenticated ?
                    <Navigate to="/home" replace /> :
                    <Navigate to="/" replace />} />
        </Routes>
    );
};

export default DashboardRoutes;