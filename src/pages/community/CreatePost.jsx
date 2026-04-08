import { GoImage } from "react-icons/go";
import { IoArrowBack, IoClose } from "react-icons/io5";

import { Form, Link } from "react-router-dom";
import { useState } from "react";
import i18next from "i18next";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import RadioButton from "../../components/ui/RadioButton";

export default function CreatePost() {
  const [checkedCategory, setCheckedCategory] = useState("");
  const [images, setImages] = useState([]); // [{ file, preview }]

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // reset input so same file can be picked again
  };

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const postCategories = [
    { id: "general", name: "general", value: "عام" },
    { id: "type1", name: "type1", value: "النوع الأول" },
    { id: "type2", name: "type2", value: "النوع الثاني" },
    { id: "lada", name: "LADA", value: "السكري المناعي" },
    { id: "mody", name: "MODY", value: "السكري أحادي الجين" },
    { id: "gestational", name: "Gestational", value: "السكري الحملي" },
    { id: "advices", name: "advices", value: "نصائح" },
  ];

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-8 mt-5">
      {/* header */}
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
            <p className="text-[#161A41] text-sm sm:text-base font-bold">
              منتصر إسماعيل
            </p>
          </div>
        </div>
      </div>

      {/* form */}
      <Form className="grid gap-6 mt-8">
        {/* image upload area */}
        <div className="flex-col-start gap-3">
          <label className="text-[#161A41] font-bold text-sm sm:text-base">
            الصور
          </label>

          {/* previews grid */}
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
                  {/* remove button */}
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

          {/* add more / initial upload button */}
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
              className={` rounded-full flex items-center justify-center shrink-0 ${
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
              {images.length === 0 ? "إضافة صورة" : "إضافة المزيد من الصور"}
            </p>
          </label>
        </div>

        {/* title */}
        <Input
          label={"عنوان المنشور"}
          name="title"
          placeholder="أدخل عنوان المنشور..."
        />

        {/* body */}
        <div className="flex-col-start gap-3">
          <label
            htmlFor="post-body"
            className="text-[#161A41] font-bold text-sm sm:text-base cursor-pointer"
          >
            محتوى المنشور
          </label>

          <textarea
            name="body"
            id="post-body"
            placeholder="شارك تجربتك أو نصيحتك..."
            className="w-full bg-[#D9D9D9]/30 text-[#161A41] rounded-lg px-4 py-2.5 sm:py-3 
            border-[#D9D9D9]/30 focus:border-[#6976EB] text-sm sm:text-base font-semibold outline-none transition-all"
          ></textarea>
        </div>

        {/* categories */}
        <div className="flex flex-col gap-3">
          <label className="text-[#161A41] font-bold text-sm sm:text-base cursor-pointer">
            اختر فئة السكري المرتبطة بالمنشور
          </label>

          <div className="grid grid-cols-3 gap-4">
            {postCategories.map((category, index) => (
              <RadioButton
                key={index}
                id={category.id}
                name={category.name}
                value={category.value}
                onChange={() => setCheckedCategory(category.id)}
                isChecked={checkedCategory === category.id}
              >
                {category.value}
              </RadioButton>
            ))}
          </div>
        </div>

        {/* submit */}
        <Button
          type="submit"
          className="bg-[#6976EB] hover:bg-[#2B3695] w-full p-4 transition-all flex-center gap-2 cursor-pointer"
        >
          <p className="text-white">تأكيد</p>
        </Button>
      </Form>
    </div>
  );
}
