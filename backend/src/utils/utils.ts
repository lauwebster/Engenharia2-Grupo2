
export function validarEmail(email: string) {
  if (email == "") return false;
  const regex = /^([a-z\d\._-])+@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return regex.test(email);
};

export function validarTelefone(telefone: string){
    if (telefone == "") return false;
    const regex = /^[1-9]{2}[0-9]{9}$/;
    return regex.test(telefone);
};

export function validarNomeCompleto (nome: string){
    if (nome == "") return false;
    const regex = /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/gm;
    //nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
    return regex.test(nome);
};

export function validarDataNasc (data_nasc: string){

  if (data_nasc == null) return false;

  let diaAniversario = parseInt(data_nasc.split('-')[0]);
  let mesAniversario = parseInt(data_nasc.split('-')[1]);
  let anoAniversario = parseInt(data_nasc.split('-')[2]);

  const dataHoje = new Date();
  const nascimento = new Date(anoAniversario, mesAniversario, diaAniversario);
  let idade = dataHoje.getFullYear() - nascimento.getFullYear();

  if (mesAniversario < 0 || (mesAniversario === 0 && dataHoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  if (idade >= 18)
    return true;
  else
    return false;

};

export function validaCPF(cpf: string){
    console.log(cpf);
    if (cpf == "") return false;
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }

    let soma = 0;
    let num = 10;
    let verifica = 0;

    for (let i = 0; i < 9; i++) {
      soma = soma + parseInt(cpf[i]) * (num - i);
    }

    let resto = soma % 11;

    if (resto == 0 || resto == 1) {
      if (cpf[9] == "0") verifica++;
    } else {
      let v = 11 - resto;
      if (cpf[9] == v.toString()) verifica++;
    }

    soma = 0;
    num = 11;

    for (let j = 0; j < 10; j++) {
      soma = soma + parseInt(cpf[j]) * (num - j);
    }

    resto = soma % 11;

    if (resto == 0 || resto == 1) {
      if (cpf[10] == "0") verifica++;
    } else {
      let a = 11 - resto;
      if (cpf[10] == a.toString()) verifica++;
    }

    if (verifica == 2) {
      return true;
    }
};
  
export function verificaCEP(cep: string){
  if (cep == null) {
    return false;
  }
  const regex = /^[0-9]{8}$/;

  if (regex.test(cep) == true) {
    return true;
  }
  return false;
};