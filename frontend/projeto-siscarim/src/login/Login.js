import React, {useState} from 'react'
import './login-styles.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login(){

    const [valores, setValores] = useState({
        email: '',
        password: ''
    });
    const [erros, setErros] = useState('');
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValores(prev => ({...prev, [event.target.name]: [event.target.value]}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validation(valores);

        if(!erros.length > 0){
            axios.post('http://localhost:3000/login', {
                email: valores.email,
                password: valores.password
            })
            .then(res => {
                navigate("/menu");
                console.log(res);
            })
            .catch(err => console.log(err))
        }
    }

    function validation(values){
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(values.email === "")
            setErros("Campo não deve ser vazio");
        else if(!emailPattern.test(values.email))
            setErros("Email inválido");
        else{
            setErros("");
        }

        if(values.password === "")
            setErros("Senha não pode ser vazia");
        else{
            setErros("");
        }
    }

    return (
        <div id='fundo-login' className='d-flex justify-content-center align-items-center vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input  name='email' placeholder='Informe seu email' onChange={handleInput} className='form-control rounded-0'></input>
                        {erros.email && <span className='text-danger'> {erros.email} </span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='password' placeholder='Informe sua senha' onChange={handleInput} className='form-control rounded-0'></input>
                        {erros.password && <span className='text-danger'> {erros.password} </span>}
                    </div>
                    <button type='submit' className='btn btn-success bg-black w-100 rounded-0'>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;