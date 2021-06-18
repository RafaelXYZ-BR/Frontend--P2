import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class Criarprodutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nome: "",
                descrição: "",
                preço: "",
                quantidade: ""
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar produtos</legend>
                        <div className="produtos-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produtos.nome}
                                onChange={this.handleInputChange}
                            />
                             </div>
                        <div className="produtos-insert">
                            <label htmlFor="descrição">Descrição</label>
                            <br />
                            <input
                                type="text"
                                id="descrição"
                                name="descrição"
                                placeholder="descrição"
                                required
                                value={this.state.produtos.descrição}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="preço">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preço"
                                name="preço"
                                placeholder="preço"
                                required
                                value={this.state.produtos.preço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="quantidade">Quantidade</label>
                            <br />
                            <input
                                type="text"
                                id="quantidade"
                                name="quantidade"
                                placeholder="quantidade"
                                required
                                value={this.state.produtos.quantidade}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produtos: { ...prevState.produtos, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}`, {
            method: "post",
            body: JSON.stringify(this.state.produtos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default Criarprodutos;