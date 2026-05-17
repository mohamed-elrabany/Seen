import { GoImage } from "react-icons/go";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

import {
  Form,
  Link,
  redirect,
  useSubmit,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import i18next from "i18next";
import { createPost } from "../../services/communityServices";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RadioButton from "../../components/ui/RadioButton";
import toast from "react-hot-toast";

export default function CreatePost() {
  const user = useSelector((state) => state.user.user);
  const { t } = useTranslation();
  const submit = useSubmit(); // Hook to trigger manual submission
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    images: [],
  });

  const [checkedCategory, setCheckedCategory] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPost((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    e.target.value = "";
  };

  const removeImage = (index) => {
    setPost((prev) => {
      URL.revokeObjectURL(prev.images[index].preview);
      return { ...prev, images: prev.images.filter((_, i) => i !== index) };
    });
  };

// Manual submission handler to bridge State and FormData
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // 1. Remove the empty value from the hidden <input name="images" />
    formData.delete("images[]");

    // 2. Append each file from state
    post.images.forEach((imgObj) => {
      formData.append("images[]", imgObj.file);
    });

    // console.log("Files attached:", formData.getAll("images"));
    // console.log("Title:", formData.getAll(images));

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  const postCategories = [
    { id: "General", label: "communityPage.shared.categories.general" },
    { id: "Type1 / LADA", label: "communityPage.shared.categories.type1" },
    { id: "Type2", label: "communityPage.shared.categories.type2" },
    { id: "MODY", label: "communityPage.shared.categories.mody" },
    { id: "Gestational", label: "communityPage.shared.categories.gestational" },
    { id: "Advices", label: "communityPage.shared.categories.advices" },
  ];

  const isFormValid = post.title && post.content && checkedCategory;

  return (
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

      {/* Form */}
      <Form onSubmit={handleSubmit} className="grid gap-6 mt-8">
        {/* Image Upload Area */}
        <div className="flex flex-col items-start gap-3">
          <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base">
            {t("communityPage.createPost.imagesLabel")}
          </label>

          {/* Previews Grid */}
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
                    src={img.preview}
                    alt={`preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <IoClose className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Image Button */}
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
              name="images[]"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <div
              className={`rounded-full flex items-center justify-center shrink-0 ${
                post.images.length === 0
                  ? "w-16 h-16 bg-white/20"
                  : "w-9 h-9 bg-[#6976EB]"
              }`}
            >
              <GoImage
                className={`text-white ${
                  post.images.length === 0 ? "w-10 h-10" : "w-6 h-6"
                }`}
              />
            </div>

            <p
              className={`font-bold ${
                post.images.length === 0
                  ? "text-white text-base"
                  : "text-[#6976EB] text-sm"
              }`}
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

        {/* Body */}
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

        {/* Submit */}
        <Button
          disabled={!isFormValid || isSubmitting}
          type="submit"
          className={`w-full mt-8 px-6 py-4 transition-all flex items-center justify-center gap-2 ${
            !isFormValid || isSubmitting
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
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <CgSpinner className="text-white w-8 h-8" />
                </motion.div>
                <p>Adding Post</p>
              </motion.div>
            ) : (
              <motion.p
                key="static"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Add Post
              </motion.p>
            )}
          </AnimatePresence>
        </Button>
      </Form>
    </div>
  );
}

/**
 * Action function to handle the form submission
 */
export async function action({ request }) {
  const formData = await request.formData();
    console.log("title:", formData.get("title"));
  console.log("content:", formData.get("content"));
  console.log("category:", formData.get("category"));
  console.log("images:", formData.getAll("images"));

  try {
    const response = await createPost(formData);
    console.log("Post created:", response);

    toast.success("Post created successfully!");
    return redirect("/community");
  } catch (error) {
    console.error("Action error:", error);
    toast.error("Failed to create post!");
    return null;
  }
}
