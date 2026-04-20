import { GoImage } from "react-icons/go";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { Form, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RadioButton from "../../components/ui/RadioButton";

export default function CreatePost() {
  const { t } = useTranslation();
  const [checkedCategory, setCheckedCategory] = useState("");
  const [images, setImages] = useState([]); // [{ file, preview }]

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; 
  };

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Restored the labels as translation keys
  const postCategories = [
    { id: "general", label: "communityPage.shared.categories.general" },
    { id: "type1", label: "communityPage.shared.categories.type1" },
    { id: "type2", label: "communityPage.shared.categories.type2" },
    { id: "lada", label: "communityPage.shared.categories.lada" },
    { id: "mody", label: "communityPage.shared.categories.mody" },
    { id: "gestational", label: "communityPage.shared.categories.gestational" },
    { id: "advices", label: "communityPage.shared.categories.advices" },
  ];

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-8 mt-5">
      {/* Header */}
      <div className="flex-start gap-5">
        <Link to={"/community"} className="bg-white p-3 rounded-lg shadow-lg">
          <IoArrowBack
            className={`${
              i18next.language === "ar" ? "rotate-180" : ""
            } w-5 h-5`}
          />
        </Link>

        <div className="flex-start gap-4">
          <div className="w-12 h-12 bg-[#ADB4F3]/60 rounded-full flex items-center overflow-hidden justify-center shrink-0">
            <img src="" alt="" />
          </div>
          <div className="flex-col-start">
            <p className="text-[#161A41] dark:text-white text-sm sm:text-base font-bold">
              منتصر إسماعيل
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Form className="grid gap-6 mt-8">
        {/* Image Upload Area */}
        <div className="flex-col-start gap-3">
          <label className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base">
            {t("communityPage.createPost.imagesLabel")}
          </label>

          {/* Previews Grid */}
          {images.length > 0 && (
            <div
              className={`grid gap-3 w-full ${
                images.length === 1
                  ? "grid-cols-1"
                  : images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-3"
              }`}
            >
              {images.map((img, index) => (
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
              images.length === 0
                ? "bg-[#6976EB] hover:bg-[#2B3695] rounded-2xl p-8 flex-col-center gap-4"
                : "bg-[#6976EB]/10 hover:bg-[#6976EB]/20 border-2 border-dashed border-[#6976EB] rounded-xl p-4 flex items-center justify-center gap-4"
            }`}
          >
            <input
              id="images"
              type="file"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <div
              className={`rounded-full flex items-center justify-center shrink-0 ${
                images.length === 0 ? "w-16 h-16 bg-white/20" : "w-9 h-9 bg-[#6976EB]"
              }`}
            >
              <GoImage
                className={`text-white ${
                  images.length === 0 ? "w-10 h-10" : "w-6 h-6"
                }`}
              />
            </div>

            <p
              className={`font-bold ${
                images.length === 0
                  ? "text-white text-base"
                  : "text-[#6976EB] text-sm"
              }`}
            >
              {images.length === 0 
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
        />

        {/* Body */}
        <div className="flex-col-start gap-3">
          <label
            htmlFor="post-body"
            className="text-[#161A41] dark:text-white font-bold text-sm sm:text-base cursor-pointer"
          >
            {t("communityPage.createPost.contentLabel")}
          </label>

          <textarea
            name="body"
            id="post-body"
            placeholder={t("communityPage.createPost.contentPlaceholder")}
            className="w-full bg-[#D9D9D9]/30 dark:bg-white/10 text-[#161A41] dark:text-white rounded-lg px-4 py-2.5 sm:py-3 placeholder:text-[#808080] dark:placeholder:text-gray-400
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base outline-none transition-all"
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
                {/* Now translating the label key from the array */}
                {t(category.label)}
              </RadioButton>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="bg-[#6976EB] hover:bg-[#2B3695] w-full p-4 transition-all flex-center gap-2 cursor-pointer"
        >
          <p className="text-white">{t("communityPage.createPost.submit")}</p>
        </Button>
      </Form>
    </div>
  );
}