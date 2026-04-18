import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
export default function Profile(){
    return(
        <div className="p-6 lg:p-8 space-y-8">
            <ProfileHeader />
            <PersonalInfo />
        </div>
    );
}