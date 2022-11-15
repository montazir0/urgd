let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let categoty=document.getElementById('categoty')
let submit=document.getElementById('submit')

//------العمليات الحسابية total-------\\
let mod='create'
let tpm;



function getTotal(){
  if(price.value != ''){
    let rebas= (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML=rebas;
    total.style.background='#03CB00EB'
  }
else {
  total.innerHTML='';
  total.style.background='#CB0000EB'
}
}


//-----------[data]----------\\
let datapro=[];
if (localStorage.tran != null) {
  datapro = JSON.parse(localStorage.tran)
} else {
  let datapro = [];}

submit.onclick= function(){
  let newpro={
  title:title.value.toLowerCase(), 
  price:price.value, 
  taxes:taxes.value, 
  ads:ads.value, 
  discount:discount.value, 
  total:total.innerHTML, 
  count:count.value, 
  categoty:categoty.value.toLowerCase(),
  }
  
  if (title.value != '' && price.value != '' && count.value < 101) {
    
  if ( mod==='create') {
    
  if (newpro.count > 1) {
    for (let i = 0; i < newpro.count; i++) {
      datapro.push(newpro)
    }
  }else{
    datapro.push(newpro)
  } 
  }else{
    datapro[tpm]=newpro
    mod='create'
    count.style.display='block'
    submit.innerHTML='create'
  }
  cleardata()
  }
   
  localStorage.setItem('tran',JSON.stringify(datapro));
    console.log(datapro);

  showdata()
}

//-----حذف من الانبوت بعد الضغط -------\\

 function cleardata(){
  title.value= '';
  price.value= '';
  taxes.value= '';
  ads.value= '';
  discount.value= '';
  total.innerHTML= '';
  count.value= '';
  categoty.value= '';
 }
 
 //---------tbody--------\\

function showdata(){
  let table='';
  for (let i = 0; i < datapro.length; i++){ 
table += `<tr>
<td>${i+1}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].categoty}</td>
<td><button onclick="updatedata(${i})" id="update">update</button></td>
<td><button onclick="deletedata(${i})" id="delete">delete</button></td>
</tr>`   
 getTotal()

}
document.getElementById('tbody').innerHTML=table


  let butdelete=document.getElementById('deleteall')
  if(datapro.length>0){
butdelete.innerHTML=`<button onclick="deleteall()">delete all (${datapro.length})</button>`
}else{
  butdelete.innerHTML=''}
  
}showdata()

//----------حذف عنصر---------\\

 function deletedata(i){
  datapro.splice(i,1)
localStorage.tran=JSON.stringify(datapro)
showdata()
 }

 function deleteall() {
   localStorage.clear()
   datapro.splice(0)
   showdata()
 }

function updatedata(i){
  title.value=datapro[i].title
  price.value=datapro[i].price
  taxes.value=datapro[i].taxes
  ads.value=datapro[i].ads
  discount.value=datapro[i].discount
  getTotal()
  count.style.display='none'
  categoty.value=datapro[i].categoty
  submit.innerHTML='update'
  mod='update'
  tpm=i
  scroll({
    top:0, 
    behavior:"smooth", 
  })
}


//-----------search----------\\

let searchmood='title'

function getsearchmood(id){
  let search=document.getElementById('search')
  if (id == 'searchTitle') {
    searchmood='title'
    search.placeholder='Search By Title'
  }else{
    searchmood='categoty'
    search.placeholder='Search By Categoty'
  }
search.focus()
search.value=''
showdata()
}


function searchdata(value){
  
  let table=''
  if (searchmood=='title') {
    
  
   for (let i = 0; i <datapro.length; i++){
  if (datapro[i].title.includes(value.toLowerCase())) {
table += `<tr>
<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].categoty}</td>
<td><button onclick="updatedata(${i})" id="update">update</button></td>
<td><button onclick="deletedata(${i})" id="delete">delete</button></td>
</tr>`   

}}
}


else{
for (let i = 0; i <datapro.length; i++){
  if (datapro[i].categoty.includes(value.toLowerCase())) {
table += `<tr>
<td>${i}</td>
<td>${datapro[i].title}</td>
<td>${datapro[i].price}</td>
<td>${datapro[i].taxes}</td>
<td>${datapro[i].ads}</td>
<td>${datapro[i].discount}</td>
<td>${datapro[i].total}</td>
<td>${datapro[i].categoty}</td>
<td><button onclick="updatedata(${i})" id="update">update</button></td>
<td><button onclick="deletedata(${i})" id="delete">delete</button></td>
</tr>`   

}}

}


document.getElementById('tbody').innerHTML=table

}
