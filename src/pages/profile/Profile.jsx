import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
export default function Profile(){
    return(
        <div className="space-y-8">
            <ProfileHeader />
            <PersonalInfo />
        </div>
    );
}