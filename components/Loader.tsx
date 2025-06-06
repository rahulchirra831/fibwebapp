
import React from 'react';
import styled from 'styled-components';

const LoaderComponent: React.FC = () => {
  return (
    <StyledWrapper>
      <div className="loader-animation" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* font-size can be set on the parent of this loader to scale it if needed, 
     as em units are relative to parent font-size. 
     Example: <div style={{fontSize: '8px'}}><Loader /></div> makes loader smaller.
     Default is usually 16px for root, so 8em = 128px.
  */

  .loader-animation { 
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Current size (8em by 8em) is quite large. 
       If used in a small card, parent font-size needs adjustment.
       E.g., for ExerciseCard, <div style={{fontSize: '4px'}}><Loader/></div> might be suitable.
       Or adjust em values here directly, e.g., height: 2em, width: 2em, border: 0.25em
    */
  }

  .loader-animation::before,
  .loader-animation::after {
    position: absolute;
    content: "";
    height: 4em; /* Scaled down for general use */
    width: 4em;  /* Scaled down for general use */
    border: 0.5em solid var(--color-primary, #5D3EBE); /* Use primary color if available */
    border-radius: 50%;
    animation: loader_ripple_79178 1.5s linear infinite; /* Renamed animation and adjusted duration */
  }

  .loader-animation::after {
    opacity: 0;
    animation-delay: 0.75s; /* Half of the animation duration */
  }

  @keyframes loader_ripple_79178 {
    0% {
      /* Use a slightly thicker border at the start for visibility */
      border-width: 0.5em; 
      transform: scale(0);
      opacity: 1;
    }
    100% {
      border-width: 0.1em; /* Thin out the border as it expands */
      transform: scale(1);
      opacity: 0;
    }
  }

  /* Dark mode considerations if primary color doesn't adapt well */
  html.dark & .loader-animation::before,
  html.dark & .loader-animation::after {
    border-color: var(--color-primary-light, #7C5CDE); /* Use light primary for dark mode */
  }
`;

export default LoaderComponent;
