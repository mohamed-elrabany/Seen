import RadioButton from "../../../components/ui/RadioButton";

import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Step4({data, setData, isStepValid}) {
  const {t}= useTranslation();

   useEffect(()=>{
      if( data.insulin_therapy ){
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
          name="insulin_therapy"
          value="Pen / Syringes"
          onChange={(e)=> setData({...data, insulin_therapy: e.target.value})}
          isChecked={data.insulin_therapy === "Pen / Syringes"}
        >
          <p>{t('registerPage.step4.options.injection')}</p>
        </RadioButton>
        <RadioButton
          id="diabetes-type"
          name="insulin_therapy"
          value="pump"
          onChange={(e)=> setData({...data, insulin_therapy: e.target.value})}
          isChecked={data.insulin_therapy === "pump"}
        >
          <p>{t('registerPage.step4.options.pump')}</p>
        </RadioButton>
        <RadioButton
          id="diabetes-type"
          name="insulin_therapy"
          value="No insulin"
          onChange={(e)=> setData({...data, insulin_therapy: e.target.value})}
          isChecked={data.insulin_therapy === "No insulin"}
        >
          <p>{t('registerPage.step4.options.noInsulin')}</p>
        </RadioButton>
      </div>
    </div>
  );
}
