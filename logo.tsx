import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}

export default function Logo({ 
  className = "", 
  iconOnly = false,
  size = 'md',
  withTagline = false
}: LogoProps) {
  // Определяем размеры логотипа
  const dimensions = {
    sm: {
      iconSize: 'w-7 h-7',
      textSize: 'text-sm',
      taglineSize: 'text-xs',
      gap: 'gap-2'
    },
    md: {
      iconSize: 'w-10 h-10',
      textSize: 'text-xl',
      taglineSize: 'text-sm',
      gap: 'gap-3'
    },
    lg: {
      iconSize: 'w-12 h-12',
      textSize: 'text-2xl',
      taglineSize: 'text-base',
      gap: 'gap-3'
    }
  };

  return (
    <Link href="/" className={`flex items-center ${dimensions[size].gap} ${className}`}>
      <div className={`relative ${dimensions[size].iconSize} rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 flex items-center justify-center`}>
        {/* Посох Асклепия (стилизованный) */}
        <div className="absolute w-2/3 h-2/3 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path 
              d="M12 3.5V20.5" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
            <path 
              d="M12 5.5C9.5 5.5 8 6.5 8 8.5C8 10.5 10 11.5 12 11.5C14 11.5 16 12.5 16 14.5C16 16.5 14.5 17.5 12 17.5" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="font-bold text-white">H</span>
      </div>
      
      {!iconOnly && (
        <div className="flex flex-col">
          <span className={`font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent font-fixedsys ${dimensions[size].textSize}`}>
            Hippocrat AI
          </span>
          {withTagline && (
            <span className={`text-teal-300 ${dimensions[size].taglineSize}`}>
              Апгрейд для медицинского образования
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

