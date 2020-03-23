import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    name: '',
    repositories: [],
    loading: false,
    error: null,
  };

  // Carregar dados no localstorage
  // componentDidMount() {
  //   const repositories = localStorage.getItem('repositories');

  //   if (repositories) {
  //     this.setState({ repositories: JSON.parse(repositories) });
  //   }
  // }

  // Salvar dados no localstorage
  // componentDidUpdate(_, prevState) {
  //   const { repositories } = this.state;

  //   if (prevState.repositories !== repositories) {
  //     localStorage.setItem('repositories', JSON.stringify(repositories));
  //   }
  // }

  handleInputChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { name } = this.state;

      if (name === '');
      throw 'Digite um repositório válido';

      await api.post('/repos/', { name });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepository, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepository}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
