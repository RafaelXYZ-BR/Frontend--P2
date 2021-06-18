import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class produtos extends Component {
    state = {
        produtos: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}${id}`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produtos, index } = this.state;
 
        if (produtos.ativo) {
            produtos.ativo = "Cliente Ativo";
        } else {
            produtos.ativo = "Cliente Inativo";
        }
 
        return (
            <div className="produtos-info">
                <h1> {produtos.nome} </h1>
                <h1> {produtos.descrição} </h1>
                <h1> {produtos.preço} </h1>
                <h1> {produtos.quantidade} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarprodutos/${produtos.id}`}> Editar </Link> <br />
                <Link to={`/deletarprodutos/${produtos.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
