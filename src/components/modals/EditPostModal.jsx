import BaseModal from "../ui/BaseModal";
import Button from "../ui/Button";
import { FiEdit } from "react-icons/fi";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { editPost } from "../../services/communityServices";

export default function EditPostModal({ postId, isOpen, onClose }) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleEditPost(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const result= await editPost(postId, postData);
            if(result){
                toast.success("Post updated successfully!");
                onClose();
                navigate(`/community/${postId}`);
            }else{
                toast.error("Failed to update the post.");
            }   
        }catch(error){
            console.error("Network error:", error);
            toast.error("Network error. Please check your connection and try again.");
        }
        finally{
            setIsSubmitting(false);
        }   
    }

  return <BaseModal isOpen={isOpen} onClose={onClose} icon={FiEdit} title="Edit Post">
    {/* Modal content goes here */}
        <div className="min-h-screen max-w-3xl mx-auto px-6 py-8 mt-5">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Link to={"/community"} className="bg-white p-3 rounded-lg shadow-lg">
          <IoArrowBack
            className={`${
              i18next.language === "ar" ? "rotate-180" : ""
            } w-5 h-5`}
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0">
            <img src={user?.avatar || ""} alt={user?.first_name} />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold">
              {user?.first_name} {user?.last_name}
            </p>
          </div>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="grid gap-6 mt-8">
        {/* Images */}
        <div className="flex flex-col items-start gap-3">
          <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base">
            {t("communityPage.createPost.imagesLabel")}
          </label>

          {post.images.length > 0 && (
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
                    src={img.preview || img}
                    alt={`preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="cursor-pointer absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <IoClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="images"
            className={`w-full cursor-pointer transition-all ${
              post.images.length === 0
                ? "bg-[#6976EB] hover:bg-[#2B3695] rounded-2xl p-8 flex flex-col items-center justify-center gap-4"
                : "bg-[#6976EB]/10 hover:bg-[#6976EB]/20 border-2 border-dashed border-[#6976EB] rounded-xl p-4 flex items-center justify-center gap-4"
            }`}
          >
            <input
              id="images"
              type="file"
              className="hidden"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              className={`rounded-full flex items-center justify-center shrink-0 ${post.images.length === 0 ? "w-16 h-16 bg-white/20" : "w-9 h-9 bg-[#6976EB]"}`}
            >
              <GoImage
                className={`text-white ${post.images.length === 0 ? "w-10 h-10" : "w-6 h-6"}`}
              />
            </div>
            <p
              className={`font-bold ${post.images.length === 0 ? "text-white text-base" : "text-[#6976EB] text-sm"}`}
            >
              {post.images.length === 0
                ? t("communityPage.createPost.addImage")
                : t("communityPage.createPost.addMore")}
            </p>
          </label>
        </div>

        {/* Title */}
        <Input
          label={t("communityPage.createPost.titleLabel")}
          name="title"
          placeholder={t("communityPage.createPost.titlePlaceholder")}
          required
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        {/* Content */}
        <div className="flex flex-col items-start gap-3">
          <label
            htmlFor="content"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            {t("communityPage.createPost.contentLabel")}
          </label>
          <textarea
            name="content"
            id="content"
            required
            value={post.content}
            rows={5}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder={t("communityPage.createPost.contentPlaceholder")}
            className="w-full no-scrollbar bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400 border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
          ></textarea>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer">
            {t("communityPage.createPost.categoryLabel")}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Button
            type="button"
            onClick={onCancel} // restored onCancel trigger
            className="h-full order-2 sm:order-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-6 py-4 font-bold cursor-pointer rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Cancel
          </Button>

          <Button
            disabled={!isChanged || isSubmitting}
            type="submit"
            className={`order-1 sm:order-2 w-full px-6 py-4 transition-all flex items-center justify-center gap-2 rounded-xl ${
              !isChanged || isSubmitting
                ? "bg-[#808080]/20 text-[#808080] cursor-not-allowed"
                : "bg-[#6976EB] hover:bg-[#2B3695] text-white cursor-pointer"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
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
                  <p>Updating Post</p>
                </motion.div>
              ) : (
                <motion.p
                  key="static"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Update Post
                </motion.p>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </Form>
    </div>

  </BaseModal>;
}
