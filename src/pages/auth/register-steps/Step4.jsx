import RadioButton from "../../../components/ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step4({data, setData, isStepValid}) {
  const {t}= useTranslation();

   useEffect(()=>{
      if( data.insulin ){
        isStepValid(true);
      }else{
        isStepValid(false);
      }
    },[data]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#161A41] mb-8">{t('registerPage.step4.title')}</h2>
      <div className="grid items-center gap-4">
        <RadioButton
          id="diabetes-type"
          name="insulin"
          value="injection"
          onChange={(e)=> setData({...data, insulin: e.target.value})}
          isChecked={data.insulin === "injection"}
        >
          <p>{t('registerPage.step4.options.injection')}</p>
        </RadioButton>
        <RadioButton
          id="diabetes-type"
          name="insulin"
          value="pills"
          onChange={(e)=> setData({...data, insulin: e.target.value})}
          isChecked={data.insulin === "pills"}
        >
          <p>{t('registerPage.step4.options.pump')}</p>
        </RadioButton>
        <RadioButton
          id="diabetes-type"
          name="insulin"
          value="no-insulin"
          onChange={(e)=> setData({...data, insulin: e.target.value})}
          isChecked={data.insulin === "no-insulin"}
        >
          <p>{t('registerPage.step4.options.noInsulin')}</p>
        </RadioButton>
      </div>
    </div>
  );
}
