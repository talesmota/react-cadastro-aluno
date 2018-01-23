import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Menu extends Component {
    
        constructor(props){
        super(props);
        this.state = {fotos:[]};
    }
    
    render(){
        return (
          <div className="nav-side-menu">
                    <div className="brand">NTI</div>
                    <i data-toggle="collapse" data-target="#menu-content" className="fa fa-bars fa-2x toggle-btn"></i> 
                    <div className="menu-list">
                       <ul id="menu-content" className="menu-content collapse out">
                          <li><Link to="/" className="router-link-active"><i className="fa fa-home fa-lg"></i> Home
                             </Link>
                          </li>
                          <li data-toggle="collapse" data-target="#products" className="active" aria-expanded="true"><a href="/alunos/cadastrar" className="router-link-exact-active router-link-active"><i className="fa fa-book fa-lg"></i> Disciplina <span className="arrow"></span></a></li>
                          <ul id="products" className="sub-menu collapse in" aria-expanded="true" >
                             <li className="active"><Link to="/listar-disciplinas" className="">
                                Listar disciplinas
                                </Link>
                             </li>
                             <li><Link to="/cadastrar-disciplina" className="">
                                Cadastrar disciplina
                                </Link>
                             </li>
                          </ul>
                          <li data-toggle="collapse" data-target="#service" className="" aria-expanded="true"><a href="/alunos/cadastrar" className="router-link-exact-active router-link-active"><i className="fa fa-users fa-lg"></i> Alunos <span className="arrow"></span></a></li>
                          <ul id="service" className="sub-menu collapse in" aria-expanded="true" >
                             <li className="active"><Link to="/listar-alunos" className="">
                                Listar Alunos
                                </Link>
                             </li>
                             <li><Link to="/cadastrar-alunos" className="router-link-exact-active router-link-active">
                                Cadastrar Aluno
                                </Link>
                             </li>
                          </ul>
                       </ul>
                    </div>
                 </div>
        );
    }
}