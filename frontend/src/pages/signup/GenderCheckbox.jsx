import React from 'react'

const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`cursor-pointer label gap-2 ${selectedGender === "male" ? "selected" : ""}`}>
                    <span className='label-text text-white font-light'>Male</span>
                    <input type='checkbox' className='checkbox border-gray-200' checked={selectedGender === "male"} onChange={() => onCheckboxChange("male")} />
                </label>
            </div>
            
            <div className='form-control'>
                <label className={`cursor-pointer label gap-2 ${selectedGender === "female" ? "selected" : ""}`}>
                    <span className='label-text text-white font-light'>Female</span>
                    <input type='checkbox' className='checkbox border-gray-200' checked={selectedGender === "female"} onChange={() => onCheckboxChange("female")} />
                </label>
            </div>
        </div>
    );
}

export default GenderCheckbox;