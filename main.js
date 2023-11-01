let title=document.getElementById("title");
let price=document.getElementById("price");
let ads=document.getElementById("ads");
let taxes=document.getElementById("taxes");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let submit=document.getElementById("submit");
let mood="create";
let tmp;
console.log(title,
    price, ads, taxes,discount,total,count,category,submit
)
//1-get total
function getTotal(){
    if (price.value!=''){
     let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
     total.innerHTML=result;
     total.style.background="#040";
    }
    else{
        total.innerHTML='';
        total.style.background="#a00d02";
    }
}

//2-create product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product);
}else{
    datapro=[];
}
submit.onclick=function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
if(title.value!=""
 && price.value!="" 
&& category.value!="" 
&& newpro.count<100){
    if(mood==="create"){
        if (newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
        datapro.push(newpro);
    }
    else{
        datapro[tmp]=newpro;
        mood="create"
        submit.innerHTML="Create"
        count.innerHTML.display="block";
    
    }clearData()
}    


//3-save local Storage
    localStorage.setItem("product",JSON.stringify(datapro));
    console.log(datapro);
    clearData();
    showData();
}
//4-clear inputs
function clearData(){
    title.value='';
    price.value='';
    ads.value='';
    taxes.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}
//5- Read
function showData(){
    getTotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table+=` <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
    }
document.getElementById("tbody").innerHTML=table;
let btnDelete=document.getElementById("deleteAll");
if (datapro.length>0){
    btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All(${datapro.length-1})</button>`
}else{
    btnDelete.innerHTML='';
}
}
showData();


//6-delete
function deleteData(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro);
showData();
}
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}
//7-Count

//8-update
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display="none";
    category.value=datapro[i].category;
    submit.innerHTML="Update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
//9-search

let searchMood="title";
function getSearchMood(id){
    let search=document.getElementById("search");
    if(id=="searchTitle") {
        searchMood="title";
        search.placeholder="Search By Title";
    }
    else{
        searchMood="category";
        search.placeholder="Search By Category";
    }
search.focus()  
search.value="";
showData();  
}
function searchData(value){
    let table="";
    if (searchMood="title"){
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table+=`
                  <tr>
                  <td>${i}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                   </tr>`;
                         
            }
        }
    }
    else{
        for(let i=0; i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase())){
                table+=`
                  <tr>
                  <td>${i}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>
                  <td><button onclick="updateData(${i})" id="update">Update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                   </tr>`; 
            }
        }
    }
    document.getElementById("tbody").innerHTML=table;
}
//10-clean data