import React from 'react'

const GenderCheckbox = () => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className='cursor-pointer label gap-2'>
                    <span className='label-text text-white font-light'>Male</span>
                    <input type='checkbox' className='checkbox border-gray-200'></input>
                </label>
            </div>
            
            <div className='form-control'>
                <label className='cursor-pointer label gap-2'>
                    <span className='label-text text-white font-light'>Female</span>
                    <input type='checkbox' className='checkbox border-gray-200'></input>
                </label>
            </div>
        </div>
    );
}

export default GenderCheckbox;