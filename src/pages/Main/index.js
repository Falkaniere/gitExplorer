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

  async componentDidMount() {
    const response = await api.get('/repos/');

    this.setState({
      repositories: response.data,
    });
  }

  handleInputChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    const { name, repositories } = this.state;

    if (name === '') throw 'digite um repósitorio';

    await api.post('/repos/', { name });

    const response = await api.get('/repos/');

    this.setState({
      repositories: response.data,
      name: '',
      loading: false,
      error: false,
    });
  };

  render() {
    const { name, repositories, loading, error } = this.state;

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
            value={name}
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
          {this.state.repositories.map(repository => (
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
