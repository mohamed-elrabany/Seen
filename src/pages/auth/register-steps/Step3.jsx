import RadioButton from "../../../components/ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step3({data, setData, isStepValid}) {
  const {t}= useTranslation();

  useEffect(()=>{
      if( data.diabetes_type ){
        isStepValid(true);
      }else{
        isStepValid(false);
      }
    },[data]);

  return (
    <div>
      <h2 className="mb-6">{t('registerPage.step3.title')}</h2>
      <div className="grid items-center gap-4">
        <RadioButton
          id="type1"
          name="diabetes_type"
          value="Type1"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "Type1"}
        >
          <p>{t('registerPage.step3.options.type1')}</p>
        </RadioButton>
        <RadioButton
          id="type2"
          name="diabetes_type"
          value="Type2"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "Type2"}
        >
          <p>{t('registerPage.step3.options.type2')}</p>
        </RadioButton>
        <RadioButton
          id="lada"
          name="diabetes_type"
          value="LADA"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "LADA"}
        >
          <p>{t('registerPage.step3.options.lada')}</p>
        </RadioButton>
        <RadioButton
          id="mody"
          name="diabetes_type"
          value="MODY"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "MODY"}
        >
          <p>{t('registerPage.step3.options.mody')}</p>
        </RadioButton>
        <RadioButton
          id="gestational"
          name="diabetes_type"
          value="Gestational"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "Gestational"}
        >
          <p>{t('registerPage.step3.options.gestational')}</p>
        </RadioButton>
        <RadioButton
          id="other"
          name="diabetes_type"
          value="other"
          onChange={(e)=> setData({...data, diabetes_type: e.target.value})}
          isChecked={data.diabetes_type === "other"}
        >
          <p>{t('registerPage.step3.options.other')}</p>
        </RadioButton>
      </div>
    </div>
  );
}
