import Input from "../../../components/ui/Input";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step1({ data, setData, isStepValid }) {
  const { t } = useTranslation();
  const phoneRegex = /^01[0-9]{9}$/;

  useEffect(() => {
    if (
      data.firstName &&
      data.lastName &&
      data.email &&
      data.email.includes("@") &&
      data.phone &&
      phoneRegex.test(data.phone) &&
      data.password &&
      data.password.length >= 8 &&
      data.confirmPassword &&
      data.password === data.confirmPassword
    ) {
      isStepValid(true);
    } else {
      isStepValid(false);
    }
  }, [data]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">
        {t("registerPage.step1.title")}
      </h2>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 items-center">
          <Input
            id="first-name"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            label={t("registerPage.step1.inputs.firstName.label")}
            type="text"
            name="first_name"
            placeholder={t("registerPage.step1.inputs.firstName.placeholder")}
          />
          <Input
            id="last-name"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            label={t("registerPage.step1.inputs.lastName.label")}
            type="text"
            name="last_name"
            placeholder={t("registerPage.step1.inputs.lastName.placeholder")}
          />
        </div>
        <Input
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          label={t("registerPage.step1.inputs.email.label")}
          type="email"
          name="email"
          placeholder={t("registerPage.step1.inputs.email.placeholder")}
          error={
            data.email &&
            !(data.email.includes("@") && data.email.includes("."))
          }
        />
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          label={t("registerPage.step1.inputs.phone.label")}
          type="text"
          name="phone"
          placeholder={t("registerPage.step1.inputs.phone.placeholder")}
          error={data.phone && !phoneRegex.test(data.phone)}
        />
        <Input
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          label={t("registerPage.step1.inputs.password.label")}
          type="password"
          name="password"
          minLength={8}
          placeholder={t("registerPage.step1.inputs.password.placeholder")}
          error={data.password && !(data.password.length >= 8)}
        />
        <Input
          id="confirm-password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
          label={t("registerPage.step1.inputs.confirmPassword.label")}
          type="password"
          name="confirm-password"
          placeholder={t(
            "registerPage.step1.inputs.confirmPassword.placeholder",
          )}
          error={data.confirmPassword && data.confirmPassword !== data.password}
        />
      </div>
    </div>
  );
}
