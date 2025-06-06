import React from 'react';
import styled from 'styled-components';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string; // For accessibility
  className?: string;
}

const SwitchComponent: React.FC<SwitchProps> = ({ checked, onChange, label, className }) => {
  return (
    <StyledWrapper className={className} title={label}>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-label={label}
        />
        <span className="slider" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
   --button-width: 3.5em;
   --button-height: 2em;
   --toggle-diameter: 1.5em;
   --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
   --toggle-shadow-offset: 10px;
   --toggle-wider: 3em;
   --color-grey: #cccccc;
   /* --color-green: #4296f4; */ 
   --color-green: var(--color-primary, #5D3EBE); 
  }

  html.dark .switch {
    --color-grey: #4B5563; 
    --color-green: var(--color-primary-light, #7C5CDE); 
  }

  .slider {
   display: inline-block;
   width: var(--button-width);
   height: var(--button-height);
   background-color: var(--color-grey);
   border-radius: calc(var(--button-height) / 2);
   position: relative;
   transition: 0.3s all ease-in-out;
   cursor: pointer;
  }

  .slider::after {
   content: "";
   display: inline-block;
   width: var(--toggle-diameter);
   height: var(--toggle-diameter);
   background-color: #fff;
   border-radius: calc(var(--toggle-diameter) / 2);
   position: absolute;
   top: var(--button-toggle-offset);
   transform: translateX(var(--button-toggle-offset));
   box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
   transition: 0.3s all ease-in-out;
  }

  .switch input[type="checkbox"]:checked + .slider {
   background-color: var(--color-green);
  }

  .switch input[type="checkbox"]:checked + .slider::after {
   transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
   box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
  }

  .switch input[type="checkbox"] {
   opacity: 0;
   width: 0;
   height: 0;
   position: absolute;
  }

  .switch input[type="checkbox"]:active + .slider::after {
   width: var(--toggle-wider);
  }

  .switch input[type="checkbox"]:checked:active + .slider::after {
   transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
  }

  .switch input[type="checkbox"]:focus-visible + .slider { 
    box-shadow: 0 0 0 2px var(--color-bg, white), 0 0 0 4px var(--color-green);
  }
  html.dark .switch input[type="checkbox"]:focus-visible + .slider {
    box-shadow: 0 0 0 2px var(--color-bg-dark, #0A0A0A), 0 0 0 4px var(--color-green);
  }

  .switch input[type="checkbox"]:active + .slider {
    box-shadow: 0 0 10px 4px color-mix(in srgb, var(--color-green) 35%, transparent);
    transition: box-shadow 0.1s ease-in-out; 
  }
`;

const Switch = React.memo(SwitchComponent);
export default Switch;