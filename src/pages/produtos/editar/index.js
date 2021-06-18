import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class Editarprodutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nome: "",
                preço: "",
                descrição: ""
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
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produtos: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
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
                        <div className="produtos-update">
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
                        <div className="produtos-update">
                            <label htmlFor="preço">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preço"
                                name="preço"
                                placeholder="ValorProduto"
                                min="1"
                                max="99999"
                                required
                                value={this.state.produtos.preço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="descrição">Descrição </label>
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
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
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
    };
 
    handleSubmit = event => {
        const { id } = this.state.produtos;
 
        fetch(`${process.env.REACT_APP_API_URL}${id}`, {
            method: "put",
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
 
export default Editarprodutos;