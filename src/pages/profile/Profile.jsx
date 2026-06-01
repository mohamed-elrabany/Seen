import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/settings/user/PersonalInfo";
import UserPosts from "../../components/profile/UserPosts";
import BlockUserModal from "../../components/modals/BlockUserModal";
import RemoveFriendModal from "../../components/modals/RemoveFriendModal";
import LoadingPage from "../loading/LoadingPage";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/communityServices";


export default function Profile() {
  const { userId } = useParams();
  const [openBlockModal, setOpenBlockModal] = useState(false);
  const [openRemoveFriendModal, setOpenRemoveFriendModal] = useState(false);
  const [viewedUserProfile, setViewedUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useSelector(
    (state) => state.user.user
  );

  const viewedUserId = userId
    ? Number(userId)
    : currentUser?.id;

  const isOwnProfile =
    viewedUserId === currentUser?.id;

    useEffect(() => {
        setIsLoading(true);
        // Optionally, you can fetch the viewed user's profile data here if needed
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile(viewedUserId);
                console.log("Fetched user profile:", profile); // Debugging log
                setViewedUserProfile(profile);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }finally {
                setIsLoading(false);
            }
        };

        if (viewedUserId) {
            fetchUserProfile();
        }
    }, [viewedUserId]);

    if (isLoading) {
        return <LoadingPage />;
    }

  return (
    <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
      <ProfileHeader
       currentUser={viewedUserProfile}
        userId={viewedUserId}
        isOwnProfile={isOwnProfile}
        blockModal={() => setOpenBlockModal(true)}
        removeModal={() => setOpenRemoveFriendModal(true)}
      />

      {/* <PersonalInfo />  */}

      <UserPosts
        userId={viewedUserId}   
      />

      <BlockUserModal
        userId={viewedUserId}
        isOpen={openBlockModal}
        onClose={() => setOpenBlockModal(false)}
      />

      <RemoveFriendModal
        userId={viewedUserId}
        isOpen={openRemoveFriendModal}
        onClose={() => setOpenRemoveFriendModal(false)}
      />
    </div>
  );
}
