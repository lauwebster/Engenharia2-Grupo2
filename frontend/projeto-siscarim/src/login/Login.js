import React, {useState} from 'react'
import './login-styles.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        console.log("V email " + validouEmail);
        console.log("V senha " + validouSenha);

        if((validouEmail === true) && (validouSenha === true)){
            console.log("entrou aqui");
            axios.get('http://localhost:8081/login', {
                email: email,
                senha: senha
            })
            .then((res) => {
                //verifica se os valores batem
                //se bater vai pro menu
                console.log(res);
                setLoginErrado(false);
                setErrosEmail('');
                setErrosSenha('');
                setEmail('');
                setSenha('');
                navigate("/menu");
            })
            .catch(err => {
                setLoginErrado(true);
                console.log(err);
            })
        }
    }
    
    const validarEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(email === "" || !emailPattern.test(email)){
            console.log("email aq: " + email);
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
    }
    
    const handleInputEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleInputSenha = (event) => {
        setSenha(event.target.value);
    }
    
    return (
        <div id='fundo-login' className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input  name='email' placeholder='Informe seu email' onChange={handleInputEmail} className='form-control rounded-0'></input>
                        {errosEmail && <span className='text-danger'> {errosEmail} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='senha' placeholder='Informe sua senha' onChange={handleInputSenha} className='form-control rounded-0'></input>
                        {errosSenha && <span className='text-danger'> {errosSenha} </span>}
                    </div>
                    <div className='mb-3'>
                        {loginErrado && <span className='text-danger'>Login inválido</span>}
                    </div>
                    <button type='submit' className='btn btn-success bg-black w-100 rounded-0'>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;