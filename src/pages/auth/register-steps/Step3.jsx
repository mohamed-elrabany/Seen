import RadioButton from "../../../components/ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step3({data, setData, isStepValid}) {
  const {t}= useTranslation();

  useEffect(()=>{
      if( data.diabetesType ){
        isStepValid(true);
      }else{
        isStepValid(false);
      }
    },[data]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">{t('registerPage.step3.title')}</h2>
      <div className="grid items-center gap-4">
        <RadioButton
          id="type1"
          name="diabetes"
          value="Type1"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "Type1"}
        >
          <p>{t('registerPage.step3.options.type1')}</p>
        </RadioButton>
        <RadioButton
          id="type2"
          name="diabetes"
          value="Type2"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "Type2"}
        >
          <p>{t('registerPage.step3.options.type2')}</p>
        </RadioButton>
        <RadioButton
          id="lada"
          name="diabetes"
          value="LADA"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "LADA"}
        >
          <p>{t('registerPage.step3.options.lada')}</p>
        </RadioButton>
        <RadioButton
          id="mody"
          name="diabetes"
          value="MODY"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "MODY"}
        >
          <p>{t('registerPage.step3.options.mody')}</p>
        </RadioButton>
        <RadioButton
          id="gestational"
          name="diabetes"
          value="Gestational"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "gestational"}
        >
          <p>{t('registerPage.step3.options.gestational')}</p>
        </RadioButton>
        <RadioButton
          id="other"
          name="diabetes"
          value="other"
          onChange={(e)=> setData({...data, diabetesType: e.target.value})}
          isChecked={data.diabetesType === "other"}
        >
          <p>{t('registerPage.step3.options.other')}</p>
        </RadioButton>
      </div>
    </div>
  );
}
