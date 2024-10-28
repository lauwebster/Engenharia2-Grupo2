import React, {ReactElement, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BotaoEnviar } from './login.styles.tsx';

export const FormLogin = (): ReactElement => {

  /*const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = ({password}): void => {
    onSubmit(password);
  };
  function handleEmail(text: string){
    const value = maskEmail(text);
    setEmail(value);
  };
  */
  //const [email, setEmail] = useState('');


  function realizarLogin(){
    //faz post para o login
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email cadastrado</Form.Label>
        <Form.Control
          //value={email}      
          placeholder='Informe seu e-mail'
          //onChangeText={text => handleEmail(text)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <BotaoEnviar>
        Entrar
      </BotaoEnviar>
    </Form>
  );
};