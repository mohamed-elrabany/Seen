import PersonalInfo from "../../components/settings/user/PersonalInfo";
import UserDataHeader from "../../components/settings/user/UserDataHeader";


export default function UserData() {
    return(
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <UserDataHeader />
            <PersonalInfo />
        </div>
    );
}