import PersonalInfo from "../../components/settings/user/PersonalInfo";
import UserDataHeader from "../../components/settings/user/UserDataHeader";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserData() {
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const imageExists = !!user?.profile_picture;


    return(
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <UserDataHeader openImagePreview={()=> setIsImagePreviewOpen(true)} />
            <PersonalInfo />

            {imageExists && (
              <ImagePreviewModal
                isOpen={isImagePreviewOpen}
                onClose={() => setIsImagePreviewOpen(false)}
                imageUrl={user?.profile_picture || null}
              />
            )}
        </div>
    );
}
// https://ollie-wroth-tributarily.ngrok-free.dev/storage/profiles/default.png