import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Validator extends Component {
    constructor(){
        super();
    }
    required(input){
        let output = input.target.value;
        return !!output && output.length >0 && output !== null;
    }

}

export class ListarDisciplinas extends Component{

    constructor(){
        super();
        this.state={disciplinas:[]};
    }
    componentDidMount(){
        fetch('http://localhost:8100/disciplina')
            .then(response=>response.json())
            .then(disciplinas=>{
                this.setState({disciplinas});
            });
    }
    render(){
        let index =0;
        return (
        <div>
            <h1>Lista de Disciplinas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Código</th>  
                        <th></th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        this.state.disciplinas.map(disciplina=>{
                            return (<tr key={disciplina.id}>
                                <td>{++index}</td>
                                <td>{ disciplina.name }</td>
                                <td>{ disciplina.code }</td>
                                <td>
                                    
                                <Link to={'/cadastrar-disciplina/'+disciplina.id} className="table-action">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                                <Link to={'/remover-disciplina/'+disciplina.id}>
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
export class RemoverDisciplina extends Component{
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
        fetch(`http://localhost:8100/disciplina/${this.state.id}`, requestInfo).then(resp=>{
            this.props.history.push('/listar-disciplinas');
        })
    }
    render(){
        return null;
    }
}
export class CadastrarDisciplina extends Component{
    constructor(props){
        super(props);
        
        this.state={
            alunos:[],
            students:[],
            errorName:'',
            errorCode:'',
            id:props.match.params.id||''
        };
        this.addAluno = this.addAluno.bind(this);
    }
    required(input){
        let validator = new Validator();
        let campo = input.target.name;
        campo = 'error'+campo[0].toUpperCase()+campo.substr(1);
        if(!validator.required(input)){            
            this.setState({[campo]:"O campo deve ser preenchido"});
        }else{
            this.setState({[campo]:''});
        }

    }
    componentWillMount(){
        if(this.state.id){
            fetch(`http://localhost:8100/disciplina/${this.state.id}`)
                
                .then(response=>response.json())
                .then(disciplina=>{
                    this.name.value = disciplina.name;
                    this.code.value = disciplina.code
                }).catch(err=>{
                    console.log(err);
                    return false;
                });
            fetch(`http://localhost:8100/disciplina/${this.state.id}/alunos`)
                .then(response=>response.json())
                .then(disciplina=>{
                    let students =[];
                    disciplina.map(aluno=>{
                        students.push(aluno.id);
                    })
                    console.log(students);
                    this.setState({students:students});
                }).catch(err=>{
                    console.log(err);
                    return false;
                });
        }

        fetch('http://localhost:8100/aluno')
            .then(response=>response.json())
            .then(alunos=>{
                this.setState({alunos});
            }).catch(err=>{
                console.log(err);
                return false;
            });
    }
    enviaForm(evento){
        evento.preventDefault();
        let method = 'POST';
        let url = 'http://localhost:8100/disciplina';
        let body={
            name:this.name.value,
            code:this.code.value,
            students:this.state.students
        };
        if( this.state.id){
            method='PUT';
            body.id=this.state.id;
        }
        const requestInfo = {
            method:method,
            body:JSON.stringify(body),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        fetch(url,requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                } else {
                    console.log("ERRO");

                }
            })
            .then(token => {
                this.props.history.push('/listar-disciplinas');
            })

    }
    addAluno(aluno,input){
        let index = this.state.students.indexOf(aluno.id);
        let students = this.state.students;
        if(index == -1){
            students.push(aluno.id);
        }else{
            students.splice(index,1);
        }
        this.setState({students:students});
        console.log("ALUNOS: ",this.state.students);
    }
    isChecked(aluno){
        return (this.state.students.indexOf(aluno.id)>-1)?"checked":"";
    }
    render(){
        return (
            <div>
                <h1>Hello world</h1>  
                <form onSubmit={this.enviaForm.bind(this)} method="post">
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Digite seu nome" 
                        onChange={this.required.bind(this)} onBlur={this.required.bind(this)} ref={(input) => this.name = input}/>
                    { this.state.errorName ? 
                        (
                         <div className="alert alert-danger" >{this.state.errorName}</div>
                        ):
                        (
                        <span></span>   
                        )
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="code">Código:</label>
                    <input type="text" className="form-control" id="code" name="code" placeholder="Digite o código da disciplina"
                         ref={(input) => this.code = input} onChange={this.required.bind(this)} onBlur={this.required.bind(this)}/>
                    { this.state.errorCode ? 
                        (
                         <div className="alert alert-danger">{this.state.errorCode}</div>
                        ):
                        (
                        <span></span>   
                        )
                    }
                </div>
                
                <div className="form-group">
                        <label htmlFor="state">Alunos:</label>
                        <div className="lista-alunos">
                            {
                                this.state.alunos.map(aluno=>{
                                    return (
                                        <div className="aluno-box" key={aluno.id} >                        
                                            <label  className="checkbox-inline">
                                                <input  type="checkbox" id="inlineCheckbox1" checked={this.state.students.indexOf(aluno.id)!==-1}  onChange={this.addAluno.bind(this,aluno)} value={ aluno.id } /> { aluno.name }
                                            </label>
                                        </div>
                                    );
                                })
                            }
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