import React, { useState, useEffect } from "react";
import { repositoriesService } from './services'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])


  useEffect(() => {
    repositoriesService.getRepositories().then((data) => setRepositories(data))
  }, [])

  async function handleAddRepository() {
    try {
        const repository = await repositoriesService.createRepository({
          title: `Novo projeto ${Date.now()}`,
          url: 'https://github.com/lmarcosss/desafio-reactjs-01',
          techs: ['ReactJS', 'React Native', 'NodeJS'],
        })

        setRepositories((previousRepositories) => [...previousRepositories, repository])

    } catch {
      alert('Problema ao criar repositório.')
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await repositoriesService.removeRepository(id)
      const newRepositories = repositories.filter((item) => item.id !== id)
      setRepositories(newRepositories)
    } catch {
      alert('Problema ao remover repositório.')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, url, title, techs }) => (
          <li key={id}>
            <p>{title}</p>
            <p>{url}</p>
            <div className="container-techs">
              {techs.map((tech) => (
                <p key={tech}>{tech}</p>
              ))}
            </div>
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
