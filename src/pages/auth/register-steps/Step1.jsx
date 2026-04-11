import Input from "../../../components/ui/Input";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { userExists } from "../../../services/authService";

export default function Step1({ data, setData, isStepValid }) {
  const { t } = useTranslation();
  
  const phoneRegex = /^01[0-9]{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [emailStatus, setEmailStatus] = useState('idle'); 
  const [emailError, setEmailError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [touched, setTouched] = useState({});

  function handleBlur(fieldName) {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }

  const checkEmailExists = useCallback(async (email) => {
    if (!emailRegex.test(email)) return;

    setEmailStatus('loading');
    setEmailError('');

    try {
      const exists = await userExists(email);
      if (exists) {
        setEmailError('This email exists already');
        setIsEmailVerified(false);
      } else {
        setIsEmailVerified(true);
        setEmailError('');
      }
    } catch (error) {
      setEmailError('Failed to check email');
      setIsEmailVerified(false);
    } finally {
      setEmailStatus('idle');
    }
  }, []);

  // Effect to re-verify email on refresh/navigation without loop
  useEffect(() => {
    const isValidFormat = emailRegex.test(data.email);
    if (isValidFormat && !isEmailVerified && !emailError && emailStatus === 'idle') {
      checkEmailExists(data.email);
    }
  }, [data.email, isEmailVerified, emailError, emailStatus, checkEmailExists]);

  useEffect(() => {
    const isFirstNameValid = !!data.first_name;
    const isLastNameValid = !!data.last_name;
    const isEmailValid = emailRegex.test(data.email) && isEmailVerified;
    const isPhoneValid = data.phone && phoneRegex.test(data.phone);
    const isPasswordValid = data.password && data.password.length >= 8;
    const isConfirmValid = data.confirmPassword && data.password === data.confirmPassword;

    isStepValid(
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isConfirmValid
    );
  }, [data, isEmailVerified, isStepValid]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">
        {t("registerPage.step1.title")}
      </h2>
      
      <div className="grid gap-4">
        {/* Names Row */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <Input
            name="first_name"
            label={t("registerPage.step1.inputs.firstName.label")}
            value={data.first_name || ""}
            onChange={(e) => setData({ ...data, first_name: e.target.value })}
            onBlur={() => handleBlur('first_name')}
            placeholder={t("registerPage.step1.inputs.firstName.placeholder")}
            error={touched.first_name && !data.first_name}
          />
          <Input
            name="last_name"
            label={t("registerPage.step1.inputs.lastName.label")}
            value={data.last_name || ""}
            onChange={(e) => setData({ ...data, last_name: e.target.value })}
            onBlur={() => handleBlur('last_name')}
            placeholder={t("registerPage.step1.inputs.lastName.placeholder")}
            error={touched.last_name && !data.last_name}
          />
        </div>
        
        {/* Email Input */}
        <div className="space-y-1">
          <Input
            name="email"
            label={t("registerPage.step1.inputs.email.label")}
            type="email"
            value={data.email || ""}
            onBlur={() => {
              handleBlur('email');
              if (!isEmailVerified) checkEmailExists(data.email);
            }}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setIsEmailVerified(false);
              setEmailError(''); 
            }}
            placeholder={t("registerPage.step1.inputs.email.placeholder")}
            error={touched.email && emailError}
          />
          {emailStatus === 'loading' && (
            <p className="text-xs text-gray-400 italic px-1">Checking...</p>
          )}
        </div>
        
        {/* Phone Input */}
        <Input
          name="phone"
          label={t("registerPage.step1.inputs.phone.label")}
          value={data.phone || ""}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          onBlur={() => handleBlur('phone')}
          placeholder={t("registerPage.step1.inputs.phone.placeholder")}
          error={touched.phone && data.phone && !phoneRegex.test(data.phone) ? "Invalid phone format" : false}
        />
        
        {/* Password Input */}
        <Input
          name="password"
          label={t("registerPage.step1.inputs.password.label")}
          type="password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          onBlur={() => handleBlur('password')}
          placeholder={t("registerPage.step1.inputs.password.placeholder")}
          error={touched.password && data.password && data.password.length < 8 ? "Minimum 8 characters" : false}
        />
        
        {/* Confirm Password Input */}
        <Input
          name="confirmPassword"
          label={t("registerPage.step1.inputs.confirmPassword.label")}
          type="password"
          value={data.confirmPassword || ""}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          onBlur={() => handleBlur('confirmPassword')}
          placeholder={t("registerPage.step1.inputs.confirmPassword.placeholder")}
          error={touched.confirmPassword && data.confirmPassword && data.confirmPassword !== data.password ? "Passwords mismatch" : false}
        />
      </div>
    </div>
  );
}