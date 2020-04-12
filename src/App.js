import React, { useState, useEffect } from "react";
import { repositoriesService } from './services'
import { Form } from './components'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [techs, setTechs] = useState('')


  useEffect(() => {
    repositoriesService.getRepositories().then((data) => setRepositories(data))
  }, [])

  async function handleAddRepository() {
    try {
      const hasEmptyInputs = [title, url, techs].some((value) => value.length === 0)

      if (!hasEmptyInputs) {
        const newTechs = techs.split(',')
        const repository = await repositoriesService.createRepository({
          title,
          url,
          techs: newTechs,
        })

        setRepositories((previousRepositories) => [...previousRepositories, repository])
      }

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

  const inputs = [
    {
      id: "title",
      label: "Título",
      onChange: setTitle,
      value: title,
    },
    {
      id: "url",
      label: "Página",
      onChange: setUrl,
      value: url,
    },
    {
      id: "techs",
      label: "Tecnologia",
      onChange: setTechs,
      value: techs,
    }
  ]

  return (
    <div className="repository-container">
      <header>
        <h1 className="text">Repositórios do Github</h1>
      </header>
      <div className="content">
        <Form
          onClick={handleAddRepository}
          inputs={inputs}
          textButton="Adicionar"
        />

        <ul className="repository-list" data-testid="repository-list">
          {repositories.map(({ id, url, title, techs }) => (
            <li key={id}>
              <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
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
      </div>
    </div>
  );
}

export default App;
