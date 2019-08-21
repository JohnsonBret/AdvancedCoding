var maxBeQuiet = "Please Be Quiet";

let sawyerBeQuiet = "Shuddup";
sawyerBeQuiet = "please shut up!";

const cantFakeThisFunk  = "unfazeable!";

let soLivia = {
    key: "value",
    keytwo: true,
    key3: 30
};

let maxo =["string",true,30];
console.log(maxo[0]);
console.log(maxo[1]);
console.log(maxo[2]);

console.log(soLivia.key);
console.log(soLivia.keytwo);
console.log(soLivia.key3);

function silenceJett()
{
    if(true)
    {
        console.log(sawyerBeQuiet);
    }
    else{
        console.log(maxBeQuiet);
    }
}

const jasonsTyping = ()=>{

    for(let i = 0; i < 10; i++)
    {
        console.log(cantFakeThisFunk);
    }
}

silenceJett();
jasonsTyping();