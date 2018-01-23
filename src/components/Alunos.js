import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import Cidade from './Cidades';
import {CURSOS} from './Cursos';

export class Aluno{
    constructor(name='', email='', cell='', course='', state='', city=''){
        this.name=name;
        this.email=email;
        this.cell=cell;
        this.course=course;
        this.state=state;
        this.city=city;
    }
};

export class ListarAlunos extends Component{

    constructor(){
        super();
        this.state={alunos:[]};
    }
    componentDidMount(){
        fetch('http://localhost:8100/aluno')
            .then(response=>response.json())
            .then(alunos=>{
                this.setState({alunos:alunos});
            });
    }

    render(){
        let index =0;
        return (
        <div>
            <h1>Lista de Alunos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>  
                        <th></th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        this.state.alunos.map(aluno=>{
                            return (<tr key={aluno.id}>
                                <td>{++index}</td>
                                <td>{ aluno.name }</td>
                                <td>{ aluno.email }</td>
                                <td>
                                    
                                <Link to={'/cadastrar-aluno/'+aluno.id} className="table-action">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                                <Link to={'/remover-aluno/'+aluno.id}>
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Link>
                                </td>                                
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
        );
    }
}

export class CadastrarAlunos extends Component{
    constructor(props){
        super(props);
        let cidades = new Cidade();
        
        this.state={
            cidades: cidades,
            estados:cidades.getEstados(),
            cidadesDoEstado:[],
            cursos:CURSOS,
            id:props.match.params.id||''            
        };
        this.aluno =new Aluno();
        this.selectedOptions={
            state:'',
            city:''
        };
    }
    componentWillMount(){
        if(this.state.id){
            fetch(`http://localhost:8100/aluno/${this.state.id}`)
                
                .then(response=>response.json())
                .then(aluno=>{
                    console.log(this.state.cidades.findEstado(aluno.state));
                    this.name.value = aluno.name;
                    this.email.value = aluno.email;
                    this.cell.value = aluno.cell;
                    this.curso.value = aluno.course;
                    this.selectedOptions.state.value = this.state.cidades.findEstado(aluno.state);
                    this.changeEstado();
                    this.selectedOptions.city.value = aluno.city;
                    this.aluno.state = aluno.state;
                    this.aluno.city = aluno.city
                     
                }).catch(err=>{
                    console.log(err);
                    return false;
                });
        }

    }
    changeEstado(){
        console.log("kljhs",this.state.cidades.getCidades(this.selectedOptions.state.value))
        let cidadesDoEstado = this.state.cidades.getCidades(this.selectedOptions.state.value);
        this.setState({cidadesDoEstado})
    }
    changeCidade(){
        let _estado = this.state.estados;
        this.aluno= {
        };
        this.aluno.state = _estado[this.selectedOptions.state.value][0];
        this.aluno.city = this.selectedOptions.city.value;
        console.log(this.aluno)

    }
    gravar(e){
        e.preventDefault();
        let aluno = new Aluno(this.name.value, this.email.value, this.cell.value, this.curso.value, this.aluno.state, this.aluno.city);
        let url = 'http://localhost:8100/aluno';
        let method = 'POST';
        
        if(this.state.id){
            method='PUT';            
            aluno.id=this.state.id;
        }
        const requestInfo = {
            method:method,
            body:JSON.stringify(aluno),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        fetch(url, requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                } else {
                    console.log("ERRO");

                }
            })
            .then(token => {
                this.props.history.push('/listar-alunos');
            })


    }
    render(){
        let indexEstado = 0;
        return (
        <div>
            <h1>Cadastrar Alunos</h1>
            <form onSubmit={this.gravar.bind(this)}>
            <div className="form-group">
                <label htmlFor="name">Nome:</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Digite seu nome" 
                    ref={(input) => this.name = input}  />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input type="text" className="form-control" id="email" name="email" placeholder="Digite seu e-mail"
                    ref={(input) => this.email = input} />
            </div>
            <div className="form-group">
                <label htmlFor="cell">Celular:</label>
                <input type="tel" className="form-control" id="cell" name="cell" placeholder="Digite seu celular" 
                   ref={(input) => this.cell = input} />
            </div>
            <div className="form-group">
                <label htmlFor="curso">Curso:</label>
                <select className="form-control" id="curso" name="curso" ref={(input) => this.curso = input} >
                    <option value="-1" selected>Escolha seu Curso</option>
                    {
                        this.state.cursos.map(curso=>{
                            return (<option key={curso.id} value={curso.id}>{curso.name}</option>);
                        })
                    }
                </select>
            </div>
            <div className="form-inline">
                <div className="form-group col-lg-6">
                    <label htmlFor="state">Estado:</label>
                    <select name="state" id="state" className="form-control"
                    onChange={this.changeEstado.bind(this)}
                    ref={(input) => this.selectedOptions.state = input} >
                        <option value="-1">Escolha seu Estado</option>
                        {
                            this.state.estados.map(index=>{
                                return (<option key={index[0]} value={indexEstado++}>{index[1]}</option>);
                            })
                        }
                    </select>
                </div>
                <div className="form-group  col-lg-6">
                    <label htmlFor="city">Cidade:</label>
                    <select id="city" name="city" className="form-control" onChange={this.changeCidade.bind(this)}    ref={(input) => this.selectedOptions.city = input} >
                        <option value="-1">Escolha sua Cidade</option>
                        {
                            this.state.cidadesDoEstado.map(cidade=>{
                                return (<option key={cidade[0]} value={cidade[1]}>{ cidade[1]}</option>);
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="botao">
                <button className="btn btn-default" >Voltar</button>
                <button className="btn btn-primary" >Cadsatrar</button>
            </div>
        </form>
    </div>
        );
    }
}

export class RemoverAluno extends Component{
    constructor(props){
        super(props);
        this.state = {id:props.match.params.id||''};
    }
    componentWillMount(){
        const requestInfo = {
            method:"DELETE",
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        fetch(`http://localhost:8100/aluno/${this.state.id}`, requestInfo).then(resp=>{
            this.props.history.push('/listar-alunos');
        })
    }
    render(){
        return null;
    }
}