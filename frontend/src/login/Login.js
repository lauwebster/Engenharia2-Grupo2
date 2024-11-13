import React, {useEffect, useState} from 'react'
import './login-styles.css';
import { useNavigate } from "react-router-dom";
import Navbar from '../navbar/navbar';

function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errosEmail, setErrosEmail] = useState('');
    const [errosSenha, setErrosSenha] = useState('');
    const [loginErrado, setLoginErrado] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validouEmail = validarEmail(email);
        let validouSenha = validarSenha(senha);
    
        if((validouEmail === true) && (validouSenha === true)){
            try {
                const res = await fetch('http://localhost:8080/siscarim/login', {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email, senha }),
                });
                
                if(res.data.email === email && res.data.senha === senha){
                    console.log("Login validado.");
                    navigate('/menu');
                    setLoginErrado(false);
                }
                else{
                    setLoginErrado(true);
                }
              } catch (error) {
                console.error("Erro ao enviar dados:", error);
                setLoginErrado(true);
              }
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