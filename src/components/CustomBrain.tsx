import React from 'react';

const CustomBrain = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g fill="none" stroke="url(#peach-grad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      {/* trait central unique */}
      <path d="M120 62 V181"/>

      {/* lobe gauche connecté au centre par le haut et le bas */}
      <path d="
        M120 62
        C114 44 88 40 80 59
        C78 64 78 70 79 76
        C58 75 44 89 44 109
        C44 118 48 126 54 132
        C39 139 38 160 51 171
        C59 178 71 179 82 173
        C80 185 88 198 101 200
        C113 202 120 193 120 181
      "/>

      {/* lobe droit connecté au centre par le haut et le bas */}
      <path d="
        M120 62
        C126 44 152 40 160 59
        C162 64 162 70 161 76
        C182 75 196 89 196 109
        C196 118 192 126 186 132
        C201 139 202 160 189 171
        C181 178 169 179 158 173
        C160 185 152 198 139 200
        C127 202 120 193 120 181
      "/>

      {/* plis internes */}
      <path d="M91 96 C90 109 96 118 103 126 C108 132 108 142 101 151"/>
      <path d="M84 123 C92 116 100 118 104 127"/>

      <path d="M149 96 C150 108 157 113 162 118 C166 123 164 131 158 137 C152 143 145 146 143 153"/>
      <path d="M162 118 C169 118 174 113 177 108"/>
    </g>
  </svg>
);

export default CustomBrain;
