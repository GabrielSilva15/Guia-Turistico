import  getParameters  from "./getParms.js"; 

const params= getParameters();
let isEditing = false; 
let isExcluding = false;

fetch(`http://localhost:3000/locais/${params.id}`, {
    method: "GET"
})
    .then(res => {
       return res.json();
    })
    .then(data => { 
        if(data.length === 0){
            window.location = 'index.html';
            return;
        }     
        console.log(data);
        document.querySelector("#local-nome").innerText = data.titulo;
        document.querySelector("#foto-local").src = data.foto;
        document.querySelector("#desc-local").innerText = data.descricao;
    }).catch(e=>console.log(e));

let formEdit=document.querySelector('.form-edit');
formEdit.style.display='none';
let editButton=document.querySelector('#buttonEdit');
let excluirButton=document.querySelector('#buttonExcluir'); 

let headEdit=document.querySelector('#head-edit');
let containerEdit=document.querySelector('.container');
const containerRemover=document.querySelector('.container-remover');
const buttonRemover=document.querySelector('.remover');
const buttonCancelar=document.querySelector('.cancelar');
containerRemover.style.display ='none';

let main=document.querySelector('main');
let buttonVoltar = document.querySelector('#button-voltar');


editButton.addEventListener('click',()=>{
    isEditing=true;
    if(isExcluding === false){
        formEdit.style.display='flex';
        containerRemover.style.display ='none';
        main.style.filter="blur(10px)";
        
        buttonVoltar.addEventListener('click',()=>{
            formEdit.style.display='none';
            main.style.filter="none";
            isEditing = false; 
            isExcluding = false;
        });
        formEdit.addEventListener('submit',(e)=>{
            let nomeLocal=document.querySelector('#nome-edit').value;
            let descLocal=document.querySelector('#desc-edit').value;
            let urlLocal=document.querySelector('#link-foto').value;
            
            const upObjt={
                "titulo":nomeLocal,
                "descricao":descLocal,
                "foto":urlLocal,
            }
            e.preventDefault();       
            updateData(upObjt);
        })  
    }
})


excluirButton.addEventListener('click',()=>{
    isExcluding=true;
        if(isEditing === false){
            main.style.filter="blur(10px)";           
            formEdit.style.display='none';
            containerRemover.style.display ='flex';
            buttonRemover.addEventListener('click',()=>{     
                deleteData();
            });
            buttonCancelar.addEventListener('click',()=>{
                // window.location = `pageVerMais.html?id=${params.id}`;
                main.style.filter="none";
                containerRemover.style.display ='none';
                isEditing = false; 
                isExcluding = false;
            })
            
        }
})





    




    






async function updateData(novoObjt){
    const url = `http://localhost:3000/locais/${params.id}`;
    const options={
        method:'PATCH',
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(novoObjt)
    }

    const response = await fetch(url,options);

    if(response.ok){
        console.log('Ocorreu tudo com sucesso');
    }
    else{
        console.log('Deu tudo errado');
    }
}


async function deleteData(){
    const url = `http://localhost:3000/locais/${params.id}`;
    const options={
        method:'DELETE',
        headers:{
            "Content-type":"application/json"
        },
    }

    const response = await fetch(url,options);

    if(response.ok){
        console.log('Ocorreu tudo com sucesso');
    }
    else{
        console.log('Deu tudo errado');
    }
}





// const url = `http://localhost:3000/locais?id=${params.id}`;
//     const options={
//         method:'PUT',
//         headers:{
//             "Content-type":"application/json; charset=UTF-8"
//         },
//         body:JSON.stringify({
//             "id":params.id,
//                 "titulo":nomeLocal,
//                 "descricao":descLocal,
//                 "foto":urlLocal,
//         })
//     }

//     const response = fetch(url,options);

//     if(response.ok){
//         console.log('Ocorreu tudo com sucesso');
//     }
//     else{
//         console.log('Deu tudo errado');
//     }