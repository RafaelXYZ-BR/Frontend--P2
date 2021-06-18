import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainProdutos from './pages/produtos/main';
import DetalhesProdutos from './pages/produtos/detalhes';
import CriarProdutos from './pages/produtos/criar';
import EditarProdutos from './pages/produtos/editar';
import DeletarProdutos from './pages/produtos/deletar';

 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/produtos" component={MainProdutos} />
            <Route path="/produtos/:id" component={DetalhesProdutos} />
            <Route path="/criarprodutos" component={CriarProdutos} />
            <Route path="/editarprodutos/:id" component={EditarProdutos} />
            <Route path="/deletarprodutos/:id" component={DeletarProdutos} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;