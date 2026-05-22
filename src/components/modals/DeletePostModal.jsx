import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useDeletePost } from "../../hooks/mutations/useDeletePost";

export default function DeletePostModal({
  postId,
  isOpen,
  onClose,
}) {
    const { t, i18n } = useTranslation();
    const isLTR = i18n.dir() === "ltr";
    const deletePostMutation = useDeletePost();

    async function handleDeletePost(e) {
        e.preventDefault();
        try{
        await deletePostMutation.mutateAsync(postId);
        toast.success("Post deleted successfully!");
        onClose();
        }catch(error){
            console.error("Network error:", error);
            toast.error("Network error. Please check your connection and try again.");
        }
    }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      icon={RiDeleteBin6Line}
      title={t("modals.delete-post.title")}
    >
      <form onSubmit={handleDeletePost} className="space-y-6">
        {/* Warning Message */}
        <div className={`bg-[#FF0404]/5 ${isLTR ? "border-l-4" : "border-r-4"} border-[#FF0404] p-4 rounded-lg`}>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("modals.delete-post.description")}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          {/* Cancel Button - Subtle Style */}
          <Button
            type="button"
            onClick={onClose}
            className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            {t("modals.delete-post.cancel")}
          </Button>

          {/* Delete Button - Danger Style */}
          <Button
            type="submit"
            disabled={deletePostMutation.isPending}
            className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
              deletePostMutation.isPending
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "text-[#FF0404] border-[#FF0404]/30 hover:border-[#FF0404] bg-[#FF0404]/10 hover:bg-[#FF0404]/20 cursor-pointer"
            }`}
          >
            {deletePostMutation.isPending ? t("modals.delete-post.submitting") : t("modals.delete-post.delete")}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
