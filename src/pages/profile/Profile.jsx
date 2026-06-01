import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/settings/user/PersonalInfo";
import UserPosts from "../../components/profile/UserPosts";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BlockUserModal from "../../components/modals/BlockUserModal";


export default function Profile() {
  const { userId } = useParams();
  const [openBlockModal, setOpenBlockModal] = useState(false);

  const currentUser = useSelector(
    (state) => state.user.user
  );

  const viewedUserId = userId
    ? Number(userId)
    : currentUser?.id;

  const isOwnProfile =
    viewedUserId === currentUser?.id;

  return (
    <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
      <ProfileHeader
        userId={viewedUserId}
        isOwnProfile={isOwnProfile}
        openModal={() => setOpenBlockModal(true)}
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
    </div>
  );
}
