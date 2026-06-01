import { useState } from "react";
import AvatarUpload from "../../components/settings/user/AvatarUpload";
import EditForm from "../../components/settings/user/EditForm";
import Button from "../../components/ui/Button";
import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next";

export default function EditUserData({ onClose }) {
    const user = useSelector((state) => state.user.user);
        const { t } = useTranslation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
            <AvatarUpload />
            <EditForm />
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      {/* Cancel Button - Subtle Style */}
                      <Button
                        type="button"
                        onClick={onClose}
                        className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                      >
                        {t("modals.logout-account.cancel")}
                      </Button>
            
                      {/* Logout Button - Danger Style */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
                          isSubmitting
                            ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                            : "text-white border-[#6976EB]/30 hover:border-[#6976EB] bg-[#6976EB] hover:bg-[#6976EB]/80 cursor-pointer"
                        }`}
                      >
                        {isSubmitting ? "Updating Account" : "Update Account"}
                      </Button>
                    </div>
        </div>
    );
}