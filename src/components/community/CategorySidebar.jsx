import RadioButton from "../ui/RadioButton"

import { useState } from "react"

export default function CategorySidebar(){
    const [checkedCategory, setCheckedCategory]= useState('general');

    const categories=[
        {id: 'general', name:'general', value: 'عام',},
        {id: 'type1', name:'type1', value: 'النوع الأول',},
        {id: 'type2', name:'type2', value: 'النوع الثاني',},
        {id: 'lada', name:'LADA', value: 'السكري المنماعي',},
        {id: 'mody', name:'MODY', value: 'السكري أحادي الجين',},
        {id: 'gestational', name:'Gestational', value: 'السكري الحملي',},
        {id: 'advices', name:'advices', value: 'نصائح',},
    ];

    return(
        <aside className="bg-white p-8 rounded-2xl shadow-lg">
            <h3>التصنيفات</h3>
            <div className="grid gap-4 p-4">
              {categories.map((category, index)=>(
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
            
        </aside>
    )
}