import { Outlet } from "react-router-dom"
import ProfileSection from "./Profile/ProfileSection";
import './UserHome.css'

const UserHome = () => {
    return (
        <div id='home-container'>
            <ProfileSection />
            <div id='message-sidebar'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserHome;