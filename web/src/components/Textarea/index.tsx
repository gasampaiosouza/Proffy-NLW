import style from './style.module.scss';
import { TextareaHTMLAttributes } from 'react';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  labelColor?: string;
  labelDescription?: string;
}

const Textarea: React.FC<ITextarea> = ({
  label,
  name,
  labelColor,
  labelDescription,
  ...rest
}) => {
  return (
    <div className={style['textarea-container']}>
      <label htmlFor={name} style={{ color: labelColor }}>
        {label}
        {labelDescription && (
          <span className={style.desc}>{labelDescription}</span>
        )}
      </label>
      <textarea id={name} {...rest} />
    </div>
  );
};

export default Textarea;
