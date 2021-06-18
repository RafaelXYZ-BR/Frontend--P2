import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produtos } = this.state;
 
        return (
            <div className="produtos-list">
                <Link to={`/criarprodutos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produtos, index) => (
                            <tr>
                                <th scope="row">{produtos.id}</th>
                                <td>{produtos.nome}</td>
                                <td>{produtos.preço.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produtos.descrição}</td>
                                <td> <Link to={`/produtos/${produtos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarprodutos/${produtos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarprodutos/${produtos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

