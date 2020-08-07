import style from './style.module.scss';
import { SelectHTMLAttributes } from 'react';

interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  labelColor?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<ISelect> = ({
  label,
  name,
  options,
  labelColor,
  ...rest
}) => {
  return (
    <div className={style['select-container']}>
      <label htmlFor={name} style={{ color: labelColor }}>
        {label}
      </label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>

        {options.map(({ label, value }, key) => (
          <option key={key} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
