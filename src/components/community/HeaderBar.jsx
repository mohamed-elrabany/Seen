import Header from "../layout/Header";

import { IoAddCircle } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function HeaderBar(){
    return(
        <Header>
            <h1 className="text-white">المجتمع</h1>
            <p className="text-white">شارك تجربتك وتواصل مع الآخرين</p>
            <Link 
            to={'/community/create'}
            className="bg-white flex-between p-4 rounded-lg text-[#6976EB] hover:shadow-md hover:scale-[1.01] transition-all duration-200">
                <h4 className="text-[#6976EB]">شارك شيئا مع المجتمع...</h4>
                <IoAddCircle className="w-8 h-8" />
            </Link>
        </Header>
    );
}