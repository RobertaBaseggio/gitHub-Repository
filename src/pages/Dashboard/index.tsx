import React, { useState, FormEvent } from 'react';
import { FiChevronRight} from 'react-icons/fi';
import api from '../../services/api';
import Repository from '../Repository';

import { Title, Repositories, Form } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const response = await api.get<Repository>(`repos/${newRepo}`);
    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');

  }

  return (
    <>
      <Title>Explore repositorios no GitHub</Title>

      <Form onSubmit={handleAddRepository}>
        <input value={newRepo} onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do Repositório" />
        <button type="submit"> Pesquisar </button>
      </Form>

      <Repositories>
        <a  href="#">
          <img src= "https://avatars.githubusercontent.com/u/82897794?v=4" />
          <div>
            <strong>logistica</strong>
            <p>projeto de logistica</p>
          </div>
          <FiChevronRight size={20}/>
        </a>
      </Repositories>
      <Repositories>
        <a  href="#">
          <img src= "https://avatars.githubusercontent.com/u/82897794?v=4" />
          <div>
            <strong>logistica</strong>
            <p>projeto de logistica</p>
          </div>
          <FiChevronRight size={20}/>
        </a>
      </Repositories>
    </>
  )
};

export default Dashboard;
