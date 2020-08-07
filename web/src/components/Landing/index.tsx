import style from './style.module.scss';

function Landing({ connections }) {
  return (
    <div id={style.landing} className={style.landing}>
      <div className={`${style['landing-content']} container`}>
        <div className={`${style['landing-text']}`}>
          <img className={style.logo} src="/assets/logo.svg" alt="Proffy" />
          <h2 className={style.text}>Sua plaforma de estudos online.</h2>
        </div>

        <img
          className={`${style['landing-image']}`}
          src="/assets/landing.svg"
          alt="hero image"
        />

        <div className={`${style['landing-buttons']}`}>
          <a href="teachers" className={`btn ${style.study}`}>
            <img src="/assets/icons/study.svg" alt="book" />
            Estudar
          </a>

          <a href="form" className={`btn ${style.teach}`}>
            <img src="/assets/icons/give-classes.svg" alt="teach" />
            Dar Aulas
          </a>
        </div>

        <span className={style.connections}>
          Total de {connections} conexões já realizadas
          <img src="/assets/icons/purple-heart.svg" alt="heart" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
