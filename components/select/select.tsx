'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Text } from '../text';

interface Props {
  name: string;
  options: { value: string; label: string }[];
  title?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  isError?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Select = (props: Props) => {
  const { options, title, name, value, defaultValue, onChange, isError, className, placeholder, disabled } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onChange) {
      onChange(optionValue);
    }
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder || '선택하세요';

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // value prop이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`} ref={selectRef}>
      {title && (
        <label className="pl-2" htmlFor={name}>
          <Text.HEADING text={title} />
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={name}
          name={name}
          onClick={handleToggle}
          disabled={disabled}
          className={`w-full flex items-center justify-between pl-4 pr-10 py-3 rounded-xl border ${
            isError ? 'border-red-500' : 'border-theme-border-light/50 dark:border-white/10'
          } bg-theme-bg-card/30 dark:bg-theme-bg-section/30 backdrop-blur-md text-theme-txt-default focus:outline-none focus:ring-2 focus:ring-theme-main-color/20 focus:border-theme-main-color transition-all duration-200 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          } shadow-lg shadow-black/5 dark:shadow-black/20`}>
          <span className={`${!selectedOption && placeholder ? 'text-theme-txt-gray' : ''}`}>{displayText}</span>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown
              size={18}
              className={`text-theme-txt-gray transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 rounded-xl border border-theme-border-light/50 dark:border-white/10 bg-theme-bg-card dark:bg-theme-bg-section backdrop-blur-md shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-4 py-3 transition-colors duration-150 ${
                  selectedValue === option.value
                    ? 'bg-theme-main-color/20 text-theme-main-color font-medium'
                    : 'text-theme-txt-default hover:bg-theme-bg-card/50 dark:hover:bg-theme-bg-card-hover'
                }`}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
