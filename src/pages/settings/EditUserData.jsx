import AvatarUpload from "../../components/settings/user/AvatarUpload";
import EditForm from "../../components/settings/user/EditForm";
import Button from "../../components/ui/Button";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { getMe, updateMe } from "../../services/authService";
import { userActions } from "../../store/slices/userSlice";

function validateUserData(data) {
  const errors = {};
  const phoneRegex = /^01[0-9]{9}$/;

  const firstName = (data?.first_name ?? "").trim();
  const lastName = (data?.last_name ?? "").trim();
  const phone = (data?.phone ?? "").trim();
  const birthDate = data?.birthDate ?? "";

  if (!firstName) errors.first_name = "First name is required";
  if (!lastName) errors.last_name = "Last name is required";

  if (!phone) errors.phone = "Phone is required";
  else if (!phoneRegex.test(phone)) errors.phone = "Invalid phone format";

  if (!birthDate) errors.birthDate = "Birth date is required";

  const weightRaw = data?.weight;
  const weight = weightRaw === "" || weightRaw === null || weightRaw === undefined ? NaN : Number(weightRaw);
  if (weightRaw === "" || weightRaw === null || weightRaw === undefined) {
    errors.weight = "Weight is required";
  } else if (Number.isNaN(weight) || weight < 20 || weight > 300) {
    errors.weight = "Weight must be 20–300 kg";
  }

  const heightRaw = data?.height;
  const height = heightRaw === "" || heightRaw === null || heightRaw === undefined ? NaN : Number(heightRaw);
  if (heightRaw === "" || heightRaw === null || heightRaw === undefined) {
    errors.height = "Height is required";
  } else if (Number.isNaN(height) || height < 50 || height > 250) {
    errors.height = "Height must be 50–250 cm";
  }

  if (!data?.gender) errors.gender = "Gender is required";
  if (!data?.diabetes_type) errors.diabetes_type = "Diabetes type is required";
  if (!data?.insulin_therapy) errors.insulin_therapy = "Insulin therapy is required";

  return errors;
}

function normalizeEditableField(key, value) {
  if (key === "profile_picture") return value ?? null;
  if (key === "weight" || key === "height") {
    if (value === "" || value === null || value === undefined) return "";
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? "" : numberValue;
  }
  if (typeof value === "string") {
    if (key === "first_name" || key === "last_name" || key === "phone") return value.trim();
    return value;
  }
  return value ?? "";
}

function isEditableDirty(userData, user) {
  const editableKeys = [
    "first_name",
    "last_name",
    "phone",
    "birthDate",
    "weight",
    "height",
    "gender",
    "diabetes_type",
    "insulin_therapy",
    "profile_picture",
  ];

  for (const key of editableKeys) {
    const a = normalizeEditableField(key, userData?.[key]);
    const b = normalizeEditableField(key, user?.[key]);
    if (a !== b) return true;
  }
  return false;
}

export default function EditUserData() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState(user || {});

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  
  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitAttempted(true);
    const validationErrors = validateUserData(userData);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await updateMe(userData);

      if (response?.error) {
        const message =
          response.error?.response?.data?.message ||
          response.error?.message ||
          "Failed to update account. Please try again.";
        throw new Error(message);
      }

      toast.success("Account updated successfully!");

      // Refresh Redux user so "dirty" resets and the UI stays consistent.
      const me = await getMe();
      if (me?.user) {
        dispatch(userActions.setUser(me.user));
      }

      setSubmitAttempted(false);
    } catch (error) {
      toast.error("Failed to update account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  function handleAvatarChange(profile_picture) {
    setUserData((prev) => ({ ...prev, profile_picture }));
  }

  const validationErrors = validateUserData(userData);
  const isValid = Object.keys(validationErrors).length === 0;
  const isDirty = isEditableDirty(userData, user);
  const canSubmit = !isSubmitting && isDirty && isValid;

  return (
    <form className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8" onSubmit={handleSubmit}>
      <AvatarUpload currentImage={userData?.profile_picture || null} onChange={handleAvatarChange} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        errors={validationErrors}
        submitAttempted={submitAttempted}
      />
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        {/* Cancel Button - Subtle Style */}
        <Button
          type="button"          
          disabled={isSubmitting}
          className="order-2 sm:order-1 flex-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white border-none px-4 py-3 sm:py-3.5 font-bold cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          {t("modals.logout-account.cancel")}
        </Button>

        {/* Logout Button - Danger Style */}
        <Button
          type="submit"
          disabled={!canSubmit}
          className={`order-1 sm:order-2 flex-1 px-4 py-3 sm:py-3.5 font-bold rounded-lg transition-all border ${
            !canSubmit
              ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
              : "text-white border-[#6976EB]/30 hover:border-[#6976EB] bg-[#6976EB] hover:bg-[#6976EB]/80 cursor-pointer"
          }`}
        >
          {isSubmitting ? "Updating Account" : "Update Account"}
        </Button>
      </div>
    </form>
  );
}
