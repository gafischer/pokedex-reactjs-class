import React, { Component } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BiCheckCircle } from 'react-icons/bi';
import { VscIssues } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container/index';

import {
  Loading,
  Owner,
  IssueList,
  IssueItem,
  Page,
  PageButton,
  IssueFilter,
} from './styles';

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page, state } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { state, page } = this.state;
    console.log(state, page);

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
    });
  };

  handleStateChange = async (e) => {
    const state = e.target.value;
    await this.setState({
      state,
    });

    this.loadIssues();
  };

  handlePageChange = async (page) => {
    if (page > 0) {
      await this.setState({
        page,
      });
      this.loadIssues();
    }
  };

  render() {
    const { repository, issues, loading, page } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />

          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <IssueFilter>
            <label htmlFor="state">
              <select name="state" id="state" onChange={this.handleStateChange}>
                <option value="all">Todas</option>
                <option value="open">Abertas</option>
                <option value="closed">Fechadas</option>
              </select>
            </label>
          </IssueFilter>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <IssueItem state={issue.state}>
                {issue.state === 'open' ? <VscIssues /> : <BiCheckCircle />}
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </IssueItem>
            </li>
          ))}
        </IssueList>

        <Page>
          <PageButton
            firstPage={page}
            isPrevious
            onClick={() => this.handlePageChange(page - 1)}
          >
            &lt; Anterior
          </PageButton>
          Página {page}
          <PageButton onClick={() => this.handlePageChange(page + 1)}>
            Próxima &gt;
          </PageButton>
        </Page>
      </Container>
    );
  }
}

export default withRouter(Repository);
