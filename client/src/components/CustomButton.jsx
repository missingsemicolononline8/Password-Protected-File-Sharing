import React from 'react';
import { getContrastingColor } from '../utils/helpers';

const CustomButton = ({ type, title, customStyles, handleClick, color }) => {

    const generateStyle = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: color,
                color: getContrastingColor(color)
            }
        }
        else if (type === 'outline') {
            return {
                borderWidth: '1px',
                borderColor: color,
                color: color,
                backgroundColor: getContrastingColor(color)
            }
        }
    }
    return (
        <button className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} style={generateStyle(type)} onClick={handleClick}>
            {title}
        </button>
    )
}

export default CustomButton
