OS-PD
=====
Adding new stuff:
1.      in index.html add <option> with your stuff 
2.      in main.js edit switch in setPage() function 
2.1.    add initParameters(); for old parameters deletion 
2.2.    for any parameter u need, u can use function addParameter(labelName, inputId) 
2.3.    later, all parameters are accessible using function getParameter(inputId) 
2.4.    add EventListener for submit button event 'click'. 
2.5.    in that function.... do what ever u need 
=====