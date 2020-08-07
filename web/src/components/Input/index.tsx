import style from './style.module.scss';
import { InputHTMLAttributes } from 'react';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  labelColor?: string;
  labelDescription?: string;
}

const Input: React.FC<IInput> = ({
  label,
  name,
  labelColor,
  labelDescription,
  ...rest
}) => {
  return (
    <div className={style['input-container']}>
      <label htmlFor={name} style={{ color: labelColor }}>
        {label}
        {labelDescription && (
          <span className={style.desc}>{labelDescription}</span>
        )}
      </label>
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
