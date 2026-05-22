import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { CgSpinner } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";

import { useEditPost } from "../../hooks/mutations/useEditPost";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RadioButton from "../../components/ui/RadioButton";
import BaseModal from "../ui/BaseModal";
import toast from "react-hot-toast";

export default function EditPostModal({ postData, isOpen, onClose }) {
  const { t } = useTranslation();
  const editPostMutation = useEditPost();

  // State Management
  const [post, setPost] = useState(postData);
  const [checkedCategory, setCheckedCategory] = useState(postData?.category || "");

  const postCategories = [
    { id: "General", label: "communityPage.shared.categories.general" },
    { id: "Type1 / LADA", label: "communityPage.shared.categories.type1" },
    { id: "Type2", label: "communityPage.shared.categories.type2" },
    { id: "MODY", label: "communityPage.shared.categories.mody" },
    { id: "Gestational", label: "communityPage.shared.categories.gestational" },
    { id: "Advices", label: "communityPage.shared.categories.advices" },
  ];

  const isChanged =
    post.title !== (postData?.title || "") ||
    post.content !== (postData?.content || "") ||
    checkedCategory !== (postData?.category || "");

  async function handleSubmit(e) {
    e.preventDefault(); // <-- Fixes page refresh

    if (!isChanged) {
      toast.error("No changes made to update.");
      return;
    }

    try {
      // Create update payload ensuring the correct category is bundled
      const updatedData = {
        title: post.title,
        content: post.content,
        category: checkedCategory,
        images: post.images || [], // Preserve existing images if any
      };
      console.log("Submitting update with data:", updatedData);

      await editPostMutation.mutateAsync({
        postId: postData.id,
        postData: updatedData,
      });
      toast.success("Post updated successfully.");
      onClose();
    } catch (error) {
      toast.error("Failed to update post.");
    }
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Post" icon={FiEdit}>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {post.images && post.images.length > 0 && (
            <div className="flex flex-col items-start gap-3">
              <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base">
                {t("communityPage.add-edit-post.imagesLabel")}
              </label>

              <div
                className={`grid gap-3 w-full ${
                  post.images.length === 1
                    ? "grid-cols-1"
                    : post.images.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                }`}
              >
                {post.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden h-36 group"
                  >
                    <img
                      src={img.url}
                      alt={`preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Input
            label={t("communityPage.add-edit-post.titleLabel")}
            name="title"
            placeholder={t("communityPage.add-edit-post.titlePlaceholder")}
            required
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />

          <div className="flex flex-col items-start gap-3">
            <label
              htmlFor="content"
              className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
            >
              {t("communityPage.add-edit-post.contentLabel")}
            </label>
            <textarea
              name="content"
              id="content"
              required
              value={post.content}
              rows={5}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              placeholder={t("communityPage.add-edit-post.contentPlaceholder")}
              className="w-full no-scrollbar bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400 border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer">
              {t("communityPage.add-edit-post.categoryLabel")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {postCategories.map((category) => (
                <RadioButton
                  key={category.id}
                  id={category.id}
                  name="category"
                  value={category.id}
                  onChange={() => setCheckedCategory(category.id)}
                  isChecked={checkedCategory === category.id}
                >
                  {t(category.label)}
                </RadioButton>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Button
              type="button"
              onClick={onClose} // <-- Fixed from onCancel
              className="h-full order-2 sm:order-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-6 py-4 font-bold cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Cancel
            </Button>

            <Button
              disabled={!isChanged || editPostMutation.isPending}
              type="submit"
              className={`order-1 sm:order-2 w-full px-6 py-4 transition-all flex items-center justify-center gap-2 rounded-xl ${
                !isChanged || editPostMutation.isPending
                  ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                  : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {editPostMutation.isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 items-center justify-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <CgSpinner className="text-white w-6 h-6" />
                    </motion.div>
                    <p>{t("communityPage.add-edit-post.update-submit")}</p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="static"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {t("communityPage.add-edit-post.update")}
                  </motion.p>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </form>
    </BaseModal>
  );
}