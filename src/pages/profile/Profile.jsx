import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
import UserPosts from "../../components/profile/UserPosts";
export default function Profile(){
    return(
        <div className="space-y-8">
            <ProfileHeader />
            <PersonalInfo />
            <UserPosts />
        </div>
    );
}