const userData=require('../src/app.js');
const customers=document.getElementById('customers');
console.log('hello');

$(document).ready(function(){
    // $('#loginBtn').click(function(){
    //     $('#registrationModal').modal('toggle');
    // });
    // $('#transferBtn').click(function(){
    //     $('#transferModal').modal('toggle');
    // });
    // $('#registerBtn').click(function(){
    
    let html=`<tr>
    <td class="border-right">${name}</td>
    <td class="border-right">${email}</td>
    <td class="border-right">${balance}</td>
    
</tr>`;
    customers.insertAdjacentHTML('beforeend',html);
    customers.style.backgroundColor="yellow";
    // });
});

