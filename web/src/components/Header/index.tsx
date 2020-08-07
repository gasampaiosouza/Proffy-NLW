import style from './style.module.scss';
import formStyle from '../Form/style.module.scss';

interface IHeader {
  title: string;
  description?: string;
}

const Header: React.FC<IHeader> = ({ title, description, children }) => {
  return (
    <header className={style['list-header']}>
      <div className={style['top-bar']}>
        <a href="/" className={style['top-bar-arrow']}>
          <img src="/assets/icons/back.svg" alt="<-" />
        </a>

        <img src="/assets/logo.svg" alt="Proffy" className={style.logo} />
      </div>

      <div
        className={`${style['list-header-content']} ${formStyle['header-content']}`}
      >
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};

export default Header;
