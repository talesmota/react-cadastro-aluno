import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/dashboard.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-bootstrap/dist/react-bootstrap.js';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';


import Home from './components/Home';
import {ListarAlunos, CadastrarAlunos, RemoverAluno} from './components/Alunos';
import {ListarDisciplinas, CadastrarDisciplina, RemoverDisciplina} from './components/Disciplina';

ReactDOM.render(
    (<BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/"  component={Home}/>  
                <Route path="/listar-alunos"        component={ListarAlunos}/>
                <Route path="/cadastrar-alunos"     component={CadastrarAlunos}/>
                <Route path="/cadastrar-aluno/:id"     component={CadastrarAlunos}/>
                <Route path="/remover-aluno/:id"     component={RemoverAluno}/>

                <Route path="/listar-disciplinas"   component={ListarDisciplinas}/>
                <Route path="/cadastrar-disciplina/:id" component={CadastrarDisciplina}/>
                <Route path="/cadastrar-disciplina" component={CadastrarDisciplina}/>
                <Route path="/remover-disciplina/:id" component={RemoverDisciplina}/>
            </Switch>
        </App>
      </BrowserRouter>)
    ,document.getElementById('root'));
registerServiceWorker();
