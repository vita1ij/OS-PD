
OS-PD
=====
Important
=====
Please, all common reusable classes put in Common.js
If u need to draw a box - use Common.Box(x,y,width,height,text, color)
(text is array)

Adding new stuff: <br/>
1.      in index.html add <option> with your stuff <br/>
2.      in main.js edit switch in setPage() function <br/>
2.1.    add initParameters(); for old parameters deletion <br/>
2.2.    for any parameter u need, u can use function addParameter(labelName, inputId) <br/>
2.3.    later, all parameters are accessible using function getParameter(inputId) <br/>
2.4.    add EventListener for submit button event 'click'. <br/>
2.5.    in that function.... do what ever u need <br/>
