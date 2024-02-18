//console.log(countryList);
const CURR_BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdown=document.querySelectorAll("select");
let btn = document.querySelector("#btn");
let message = document.querySelector("#message");
let flipbtn = document.querySelector("#flip-btn");
const updateExchange = async ()=>{
  let amount = document.getElementById("amount");
    let amountValue = parseFloat(amount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        amountValue = 1;
    }
  //console.log("amount: " + amountValue);
    
    //console.log("amount:"+amount.value);
    let fromCurr = document.querySelector("#from").value;
    let toCurr = document.querySelector('#to').value;
    const URL = `${CURR_BASE_URL}/${fromCurr.toLowerCase()}/${toCurr.toLowerCase()}.json`
    const response = await fetch(URL);
    //console.log(response);
    const data = await response.json();
   //console.log(data);
   const rate = data[toCurr.toLowerCase()];
   const finalValue = rate *amountValue;
   //console.log("rate:"+rate);
   //console.log(`${amountValue}${fromCurr} =${finalValue}`);
   message.innerText = `${amountValue}${fromCurr} = ${finalValue}${toCurr}`;
 
}
const updateFlag = (element)=>{
  // console.log(ele);
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newFlagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newFlagSrc;
}
const flip = ()=>{
  let fromSelect = document.getElementById('from');
  let toSelect = document.getElementById('to');
  
  // Swap values
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];

  // Update flag images
  updateFlag(fromSelect);
  updateFlag(toSelect);
  updateExchange();
}
 for (let select of dropdown){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
         //console.log("country:"+newOption.innerText+"value:"+newOption.value);
       if(select.name === "from" && currCode === "USD")
       {
         newOption.selected = "selected";
       }else if(select.name === "to" && currCode === "INR")
       {
         newOption.selected = "selected";
       }

       select.append(newOption);
      
       
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
btn.addEventListener("click", (event)=>{
    event.preventDefault();
    updateExchange();
});
flipbtn.addEventListener('click',(event)=>{
  event.preventDefault();
  flip();
});
window.addEventListener("load",updateExchange);