import React, {useEffect, useState} from 'react'
import './login-styles.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../navbar/navbar';

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errosEmail, setErrosEmail] = useState('');
    const [errosSenha, setErrosSenha] = useState('');
    const [loginErrado, setLoginErrado] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        let validouEmail = validarEmail(email);
        let validouSenha = validarSenha(senha);
        console.log("Ao apertar o botao: " + loginErrado);

        if((validouEmail === true) && (validouSenha === true)){
            console.log("Post:");
            axios.post('http://localhost:8081/login', {
                email: email,
                senha: senha
            })
            .then((res) => {
                //Valida novamente pra ter certeza
                if(res.data.email === email && res.data.senha === senha){
                    console.log("Ao validar o email e senha: " + loginErrado);
                    setLoginErrado(false);
                    setErrosEmail('');
                    setErrosSenha('');
                    setEmail('');
                    setSenha('');
                    navigate("/menu");
                }
                else{
                    console.log("Else do axios");
                    console.log(res.data.email);
                    console.log(res.data.senha);
                    setLoginErrado(true);
                }
            })
            .catch(err => {
                console.log("Catch");
                console.log(err);
                setLoginErrado(true);
            })
        }
    }
    
    const validarEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email === "" || !emailPattern.test(email)){
            setErrosEmail("Email inválido");
            return false;
        } else {
            setErrosEmail("");
            return true;
        }
    }
    
    const validarSenha = (senha) => {
        if(senha === ""){
            setErrosSenha("Senha não pode ser nula");
            return false;
        }
        else{
            setErrosSenha("");
            return true;
        }
    };

    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleInputSenha = (event) => {
        setSenha(event.target.value);
    };
   

    useEffect(() => {
        const injetaDados = sessionStorage.getItem('dadosInjetados');

        if (!injetaDados) {
            axios.get('http://localhost:8081/criar')
            .then((response) => {
                console.log("Deveria injetar dados.");
            })
            .catch((error) => {
                console.log(error.message);
            });
            sessionStorage.setItem('dadosInjetados', 'true');
        }
    }, []);

    return (
        <>
        <Navbar></Navbar>
        <div id='fundo-login' className='d-flex justify-content-center align-items-center'>
            <div id='fundo-formulario' className='p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <p id='titulo-login'>Faça seu login</p>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input  name='email' placeholder='Informe seu email' onChange={handleInputEmail} className='form-control rounded w-20'></input>
                        {errosEmail && <span className='text-danger'> {errosEmail} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='senha' placeholder='Informe sua senha' onChange={handleInputSenha} className='form-control rounded w-20'></input>
                        {errosSenha && <span className='text-danger'> {errosSenha} </span>}
                    </div>
                    <div className='mb-3'>
                        {loginErrado && <span className='text-danger'>Login inválido</span>}
                    </div>
                    <button type='submit' id='botao-login' className='btn btn-success bg-black w-100 rounded-0'>Entrar</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;