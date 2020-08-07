import { useState, FormEvent } from 'react';
import Router from 'next/router';

import style from './style.module.scss';
import Header from '../Header';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import api from '../../services/api';

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault();

    if (name && avatar && whatsapp && subject && cost && scheduleItems) {
      api
        .post('classes', {
          name,
          avatar,
          whatsapp,
          bio,
          subject,
          cost: Number(cost),
          schedule: scheduleItems,
        })
        .then(() => {
          alert('cadastro realizado com sucesso');
          Router.push('/');
        })
        .catch(() => alert('erro no cadastro'));
    } else alert('Você precisa preencher tudo!');
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((item, index) => {
      if (index === position) return { ...item, [field]: value };

      return item;
    });

    setScheduleItems(updatedScheduleItems);
  };

  return (
    <div id="form-page" className={style['form-page']}>
      <Header
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo, é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Input
              label="Link da sua foto"
              onChange={({ target }) => setAvatar(target.value)}
              value={avatar}
              name="avatar"
              labelDescription="(comece com https://)"
            />
            <Input
              label="WhatsApp"
              onChange={({ target }) => setWhatsapp(target.value)}
              value={whatsapp}
              name="whatsapp"
              labelDescription="(somente números)"
            />
            <Textarea
              label="Biografia"
              name="bio"
              onChange={({ target }) => setBio(target.value)}
              value={bio}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              label="Matéria"
              name="subject"
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
            <Input
              label="Custo da sua hora por aula"
              name="cost"
              labelDescription="(em R$)"
              value={cost}
              onChange={({ target }) => setCost(target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              <div>
                Horários disponíveis{' '}
                <button type="button" onClick={addNewScheduleItem}>
                  + Novo horário
                </button>
              </div>
            </legend>

            {scheduleItems.map(({ from, to, week_day }, index) => (
              <div key={week_day} className={style['schedule-item']}>
                <Select
                  label="Dia da semana"
                  name="weekday"
                  value={week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
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
                  name="from"
                  label="Das"
                  type="time"
                  value={from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src="/assets/icons/warning.svg" alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit" className={`${style.btn} btn`}>
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Form;
