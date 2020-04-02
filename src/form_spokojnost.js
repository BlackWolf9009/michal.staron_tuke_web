    
import { render } from "mustache";


function opinion2html(opinion){

    //in the case of Mustache, we must prepare data beforehand:
    opinion.createdDate=(new Date(opinion.created)).toDateString();

    //get the template:
    const template = document.getElementById("spokojnost_odoslane").innerHTML;
    //use the Mustache:
    const htmlWOp = render(template,opinion);

    //delete the createdDate item as we created it only for the template rendering:
    delete(opinion.createdDate);

    //return the rendered HTML:
    return htmlWOp;

}


function opinionArray2html(sourceData){
    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ opinion2html(opn),"");  
    /* "" is the initial value of htmlWithOpinions in reduce. 
    If we do not use it, the first member of sourceData will 
    not be processed correctly */
}


    let opinions=[];
    const opinionsElm=document.getElementById("spokojnost_div");
    if(localStorage.coffee_web){
        opinions=JSON.parse(localStorage.coffee_web);
    }

    console.log(opinions);
    opinionsElm.innerHTML=opinionArray2html(opinions);


    const commFrmElm=document.getElementById("spokojnost");
    commFrmElm.addEventListener("submit",processOpnFrmData);

    function processOpnFrmData(event){
        event.preventDefault();

        const meno_spo = document.getElementById("meno").value.trim();
        const priezvisko_spo = document.getElementById("priezvisko").value.trim();
        const email_spo = document.getElementById("email").value.trim();

        const muz_spo = document.getElementById("muz").checked;
        const zena_spo = document.getElementById("zena").checked;

        const arabika_spo = document.getElementById("arabika").checked;
        const robusta_spo = document.getElementById("robusta").checked;
        const ine_spo = document.getElementById("ine").checked;

        const text_a_form_spo = document.getElementById("text_a_form").value.trim();


        if(meno_spo=="" || priezvisko_spo=="" || 
            email_spo=="" || text_a_form_spo==""){
            window.alert("ProsÃ­m, vyplÅ vÅ¡etky polia.");
            return;
        }

        var poh;
        if (muz_spo==true) {
            poh="MuÅ¾"; 
        }
        else{
            poh="Å½ena"
        }

        var kava;
        if(document.getElementById("arabika").checked == true){
            kava="Arabika";
        }
        if(document.getElementById("robusta").checked == true){
            kava=kava + " " + "Robusta";
        }
        if(document.getElementById("ine").checked == true){
            kava=kava + " " + "Ine";
        }


        const newOpinion =
            {
                Meno: meno_spo,
                Priezvisko: priezvisko_spo,
                Email: email_spo,
                Pohlavie: poh,
                Oblubena_kava: kava,
                SprÃ¡va: text_a_form_spo,
                VytvorenÃ©: new Date()
            };

        console.log("New opinion:\n "+JSON.stringify(newOpinion));

        opinions.push(newOpinion);

        localStorage.coffee_web = JSON.stringify(opinions);

    //4. Update HTML
        opinionsElm.innerHTML+=opinion2html(newOpinion);

        //4. Notify the user 
     /*   window.alert("FormulÃ¡r odoslanÃ½");*/
        console.log("New opinion added");
        console.log(opinions);


        //5. Reset the form
        commFrmElm.reset();
    }