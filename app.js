// let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/pkr.json";
let BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";


let dropdowns = document.querySelectorAll(".dropdown select");

let convert = document.querySelector("button");

for(let select of dropdowns){

    for(currcode in countryList){

        let new_option = document.createElement("option");
        new_option.value = currcode;
        new_option.innerText = currcode;

        if(select.name === "from" && currcode === "USD"){

            new_option.selected = "selected";
        }else if(select.name === "to" && currcode === "PKR"){

            new_option.selected = "selected";
        }

        select.append(new_option);
    }

    select.addEventListener("change", (evt) => {

        updateFlag(evt.target);
    })
}




const updateFlag = (element) => {

    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


convert.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load", () => {

    updateExchangeRate();
})

const updateExchangeRate = async () => {

  let amount = document.querySelector(".amount input");
  let amountvalue = amount.value;

  if (amountvalue < 1 || amountvalue === "") {
    amount.value = 1;
    amountvalue = 1;
  }

  let fromcur = document.querySelector(".from select");
  let tocur = document.querySelector(".to select");

  console.log(fromcur.value, tocur.value);

  fromcur = fromcur.value.toLowerCase();
  tocur = tocur.value.toLowerCase();

  let URL = `${BASE_URL}${fromcur}.json`;

  let response = await fetch(URL);

  let currtable = await response.json();

  let market_rate = currtable[fromcur][tocur];

  let convertedamount = amountvalue * market_rate;

  convertedamount = convertedamount.toFixed(2);

  let msg = document.querySelector(".msg");

  let newmsg = `${amountvalue} ${fromcur.toUpperCase()} = ${convertedamount} ${tocur.toUpperCase()}`;

  console.log(newmsg);

  msg.innerText = newmsg;
};
