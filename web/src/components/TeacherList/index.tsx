import style from './style.module.scss';

import Header from '../Header';
import ListItem, { Teacher } from '../ListItem';
import Input from '../Input';
import Select from '../Select';
import { useState, FormEvent } from 'react';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();

    if (subject && week_day && time) {
      const { data } = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      setTeachers(data);
    } else alert('Você tem que preencher tudo!');
  };

  console.log(teachers);

  return (
    <div id="list-page" className={`${style['list-page']} container`}>
      <Header title="Estes são os proffys disponíveis">
        <form id="search" className={style.search} onSubmit={searchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            labelColor="#d4c2ff"
            value={subject}
            onChange={({ target }) => setSubject(target.value)}
            options={[
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Artes', label: 'Artes' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'História', label: 'História' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
          />

          <Select
            label="Dia da semana"
            name="week_day"
            value={week_day}
            onChange={({ target }) => setWeekday(target.value)}
            labelColor="#d4c2ff"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5 Física', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />

          <Input
            label="Hora"
            name="time"
            type="time"
            labelColor="#d4c2ff"
            value={time}
            onChange={({ target }) => setTime(target.value)}
          />

          <div className={style['button-container']}>
            <button type="submit" className={`btn`}>
              Buscar
            </button>
          </div>
        </form>
      </Header>

      <main className={style['list']}>
        {teachers.length != 0 ? (
          teachers.map((teacher: Teacher) => (
            <ListItem key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <p className={style['empty-message']}>
            Nenhum professor encontrado...
          </p>
        )}
      </main>
    </div>
  );
};

export default TeacherList;
