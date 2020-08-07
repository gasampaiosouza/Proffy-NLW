import style from './style.module.scss';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  user_id: number;
  whatsapp: string;
}

interface IList {
  teacher: Teacher;
}

const ListItem: React.FC<IList> = ({ teacher }) => {
  const createConnection = () => {
    api.post('connections', {
      user_id: teacher.id,
    });
  };

  return (
    <article className={style['list-item']}>
      <header className={style['user']}>
        <img
          src={teacher.avatar}
          alt={teacher.name}
          className={style['user-image']}
        />
        <div className={style['user-info']}>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p className={style['user-description']}>{teacher.bio}</p>

      <footer>
        <div className={style.price}>
          <p>Preço/Hora</p>
          <strong>R$ {teacher.cost.toFixed(2)}</strong>
        </div>

        <a
          target="_blank"
          href={`https://wa.me/${teacher.whatsapp}`}
          className="btn"
          onClick={() => createConnection()}
        >
          <img src="/assets/icons/whatsapp.svg" alt="whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default ListItem;
