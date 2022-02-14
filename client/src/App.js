import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CompanyCreate from "./components/CompanyCreate";
import CompanyDetails from "./components/CompanyDetails";
import CompanyEdit from "./components/CompanyEdit";
import NotFound from "./components/NotFound";
import UserRegister from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import { AuthContextProvider } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <AuthContextProvider>
            <DataContextProvider>
                <Router>
                    <Navbar />
                    <div className="App">
                        <div className="container px-5">
                            <Switch>
                                {/* "exact" keyword 保证route path会exactlly match目标path （这里是指完全match "/", 否则会出现"/create" path 会被"/" path 截断） */}
                                {/* 下面两种写法都可以： */}
                                <Route path={["/", "/companies"]} exact>
                                    <Home />
                                </Route>
                                <ProtectedRoute path="/companies/create" component={CompanyCreate} />
                                <Route exact path="/companies/:id" component={CompanyDetails} />
                                <ProtectedRoute exact path="/companies/:id/edit" component={CompanyEdit} />
                                <Route path="/user/register" component={UserRegister} />
                                <Route path="/user/login" component={UserLogin} />
                                <Route Path="*" component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                    <Footer />
                </Router>
            </DataContextProvider>
        </AuthContextProvider>
    );
}

export default App;
