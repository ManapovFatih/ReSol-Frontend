import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ value, onChange, disabled = false, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div
      className={`custom-select ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
      ref={selectRef}
    >
      <div
        className="select-header"
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="selected-value">
          {selectedOption ? selectedOption.label : 'Выберите...'}
        </span>
        <span className="select-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {options.map(option => (
            <div
              key={option.value}
              className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default CustomSelect;