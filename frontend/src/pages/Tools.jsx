import GeneratorLogo from '../assets/generatorius.svg?react'
import RotaryHammerLogo from '../assets/perforatorius.svg?react'
import ElectricRouterLogo from '../assets/elektrine-freza.svg?react'
import RouterLogo from '../assets/freza.svg?react'
import TileCuttingMachineLogo from '../assets/plyteliu-pjovimo-stakles.svg?react'
import CircularSawLogo from '../assets/diskinis-pjuklas.svg?react'
import CuttingMachineLogo from '../assets/pjovimo-stakles.svg?react'
import DemolitionHammersLogo from '../assets/atskelimo-plaktukas.svg?react'
import ChainSawsLogo from '../assets/grandininis-pjuklas.svg?react'
import ConstructionVacuumLogo from '../assets/statybinis-dulkiu-siurblys.svg?react'
import ToolGrid from '../components/ToolGrid';
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Search from '../components/Search'


const Tools = () => {
    // Takes SearchText and Category from URL params or leaves empty if none
    const [searchCriteria, setSearchCriteria] = useState({
        searchText: useSearchParams()[0].get("searchText") || '',
        category: useSearchParams()[0].get("category") || ''
    });

    const categories = [
        { key: "Generators", title: "Generators", icon: <GeneratorLogo className="w-[100%] h-[100%]" /> },
        { key: "Rotary Hammers", title: "Rotary Hammers", icon: <RotaryHammerLogo className="w-[100%] h-[100%]" /> },
        { key: "Electric Routers", title: "Electric Routers", icon: <ElectricRouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Routers", title: "Routers", icon: <RouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Tile Cutting Machines", title: "Tile Cutting Machines", icon: <TileCuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Circular Saws", title: "Circular Saws", icon: <CircularSawLogo className="w-[100%] h-[100%]" /> },
        { key: "Cutting Machines", title: "Cutting Machines", icon: <CuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Demolition Hammers", title: "Demolition Hammers", icon: <DemolitionHammersLogo className="w-[100%] h-[100%]" /> },
        { key: "Chain Saws", title: "Chain Saws", icon: <ChainSawsLogo className="w-[100%] h-[100%]" /> },
        { key: "Vacuums", title: "Construction Vacuums", icon: <ConstructionVacuumLogo className="w-[100%] h-[100%]" /> },
    ]


    return (
        <div>
            {/* Passes searchCriteria as prop to fill input field with value */}
            <Search searchCriteria={searchCriteria} setSearchCriteria={setSearchCriteria} />
            <div className='flex flex-col items-center'>
                <div
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 w-[75%] xs:w-[60%] sm:w-[70%] max-w-[900px] mt-3 mb-6 md:mt-7"
                >
                    {categories.map((item) => (
                        <div key={item.key} 
                        onClick={() => setSearchCriteria({ ...searchCriteria, category: item.key })} 
                        className={'text-center border flex flex-col items-center w-[120px] lg:w-[155px] mt-1 border-gray-200 bg-white ' + (searchCriteria.category === item.key ? 'shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]' : 'shadow-md')}>
                            <span className="text-gray-500 w-[40px] sm:w-[60px] md:w-[70px] lg:w-[90px] p-1 lg:p-2">{item.icon}</span>
                            <h3 className="text-[12px] lg:text-[20px]">{item.title}</h3>
                        </div>
                    ))}
                </div>
                <ToolGrid searchCriteria={searchCriteria} />
            </div>
        </div>
    )
}

export default Tools;