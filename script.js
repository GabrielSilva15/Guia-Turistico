// import LocalModel from "./LocaisModel.js"

// let tituloLocal=document.querySelector('#nome-local').value;
// let desc=document.querySelector('#desc').value;
// let url=document.querySelector('#url').value;

// const newLocal = new LocalModel(tituloLocal,desc,url);

//Adicionando um Novo Local No Objeto
let form= document.querySelector('#adicionar-local');
let headPrincipal=document.querySelector('#head-principal');
let mainPagePrincipal=document.querySelector('main');
form.style.display='none';

let abreForm=document.querySelector('#button-add');
abreForm.addEventListener('click',(e)=>{
    e.preventDefault();
    headPrincipal.style.filter="blur(10px)";
    mainPagePrincipal.style.filter="blur(10px)";
    form.style.display='flex';
})
form.addEventListener('submit',(e)=>{
    let local=document.querySelector('#nome-local').value;
    let desc=document.querySelector('#desc').value;
    let url=document.querySelector('#url').value;

    e.preventDefault();
    //Adicionando dados no JSON
    fetch('http://localhost:3000/locais',{
        method:'POST',
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        },
        body:JSON.stringify({
            "id":geraId(),
            "titulo":local,
            "descricao":desc,
            "foto":url,
        })
    })
    .then((response)=>{
        response.json()
    })
    .then(dados=>console.log(dados))
    .catch(e=>console.log(e));
})

//Exibindo os Locais do Objeto
function exibirLocais(){
    let ul= document.querySelector('ul');
    fetch('http://localhost:3000/locais')
    .then(res=>{
        return res.json()
    }).then(data=>{
        data.map((local=>{
            let img= document.createElement('img');
            let titulo=document.createElement('h1');
            let li=document.createElement('li');
            let verMais=document.createElement('span');

            li.classList.add('lista-local');
            verMais.classList.add('span-verMais');
            img.classList.add('img-locais');

            verMais.innerHTML='Ver Mais';
            console.log(`pageVerMais.html?id=${local.id}`);
            verMais.addEventListener('click',()=>{
                window.location =`pageVerMais.html?id=${local.id}`;
            })
           
            img.src=local.foto;
            titulo.innerHTML=local.titulo;
            li.appendChild(img);
            li.appendChild(titulo);
            li.appendChild(verMais)
            ul.appendChild(li);

        }))    
    })
    .catch(e=>console.log(e));
}
exibirLocais();


//Gera um Id Aleatorio para A foto
function geraId(){
    const maiuscula=()=>String.fromCharCode(Math.random() * (90-65) + 65);
    const minuscula=()=>String.fromCharCode(Math.random() * (122-97) + 97);
    const numeros= ()=>String.fromCharCode(Math.random() * (57-48) + 48);
    const simbolosString=',.;~^[]{}!@$*()_+=-';
    const simbolos= ()=> simbolosString[Math.floor(Math.random() * (simbolosString.length - 0) + 0)];

    let arrId=[];
    for(let i = 1; i<20/4;i++){
        arrId.push(maiuscula());
        arrId.push(minuscula());
        arrId.push(numeros());
        arrId.push(simbolos());
    }    
    return arrId.join("");
}

















