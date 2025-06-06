import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-all duration-150 ease-in-out inline-flex items-center justify-center transform hover:scale-[1.03] active:scale-[0.97]';

  const variantStyles = {
    primary: 'text-white bg-gradient-to-br from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark focus:ring-primary dark:focus:ring-primary-light shadow-lg hover:shadow-xl active:shadow-md', // Enhanced gradient and shadow
    secondary: 'bg-secondary text-white hover:bg-teal-600 focus:ring-secondary dark:bg-secondary-light dark:text-neutral-900 dark:hover:bg-secondary dark:focus:ring-secondary-light shadow-sm hover:shadow-md',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-neutral-900 dark:focus:ring-primary-light',
    ghost: 'text-primary hover:bg-primary-light/10 dark:hover:bg-primary-light/20 focus:ring-primary dark:text-primary-light dark:focus:ring-primary-light',
    link: 'text-primary hover:underline focus:ring-primary dark:text-primary-light dark:hover:underline dark:focus:ring-primary-light',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Button = React.memo(ButtonComponent);
export default Button;