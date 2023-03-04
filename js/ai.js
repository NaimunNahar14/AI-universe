
const loadAi = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`; 
    const res = await fetch(url);
    const data = await res.json();
    displayAis(data.data.tools.slice(0,6));
   toggleSpinner(true);
}
const showALL = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`; 
    const res = await fetch(url);
    const data = await res.json();
    displayAis(data.data.tools); 

 }

const displayAis = ais =>{
    const aisContainer = document.getElementById('ai-container');
    aisContainer.textContent = ''
    ais.forEach(ai =>{
        const aiDiv  = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
        <div class="card p-4">
            <img src="${ai.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4>Features</h4>
            <ol>
                <li>${ai.features[0]}</li>
                <li>${ai.features[1]}</li>
                <li>${ai.features[2]}</li>
            </ol>
                
            </div>
            <hr>
            <div class="d-flex justify-content-between">
            <div>
                <h5 class="card-title">${ai.name}</h5>
            <p class="card-text"><i class="fa-regular fa-calendar mx-2"></i>${ai.published_in}</p>
            </div>
            <div>
                        <button onclick = "modalDetails('${ai.id}')"  href="#" class="btn bg-danger text-light rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                     
                    
                </div>
        </div>
        
               
        </div>
        `
        aisContainer.appendChild(aiDiv);
    });
    toggleSpinner(false);
    
}

const toggleSpinner = isLoading => {
    const loaderSection =document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const modalDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data);
    
    
}
 const displayModalDetails = ai =>{
    console.log(ai);
    const modalTitle = document.getElementById('modal-container');
    modalTitle.innerHTML = ai.description;
    const modalFreeCost = document.getElementById('modal-freecost');
    modalFreeCost.innerHTML = ai.pricing[0].price ? ai.pricing[0].price :"Free of cost/";
    const modalPlan = document.getElementById('modal-plan');
    modalPlan.innerHTML = ai.pricing[0].plan;
    const modalFreeCost01 = document.getElementById('modal-freecost01');
    modalFreeCost01.innerHTML = ai.pricing[1].price ? ai.pricing[1].price :"Free of cost/";
    const modalPlan01 = document.getElementById('modal-plan01');
    modalPlan01.innerHTML = ai.pricing[1].plan;
    const modalFreeCost02 = document.getElementById('modal-freecost02');
    modalFreeCost02.innerHTML = ai.pricing[2].price ? ai.pricing[2].price :"Free of cost/";
    const modalPlan02 = document.getElementById('modal-plan02');
    modalPlan02.innerHTML = ai.pricing[2].plan;
    const modalFeaturesName01 = document.getElementById('F-name01');
    modalFeaturesName01.innerHTML = ai.features[1].feature_name;
    const modalFeaturesName02 = document.getElementById('F-name02');
    modalFeaturesName02.innerHTML = ai.features[2].feature_name;
    const modalFeaturesName03 = document.getElementById('F-name03');
    modalFeaturesName03.innerHTML = ai.features[3].feature_name;
    const modalIntegration01 = document.getElementById('Int-01');
    modalIntegration01.innerHTML = ai.integrations[0] ? ai.integrations[0]:"no data found";
    const modalIntegration02 = document.getElementById('Int-2');
    modalIntegration02.innerHTML = ai.integrations[1] ? ai.integrations[1]:"no data found";
    const modalIntegration03 = document.getElementById('Int-3');
    modalIntegration03.innerHTML = ai.integrations[2] ? ai.integrations[2]:"no data found";
    const modalAccuracyBtn = document.getElementById('button01');
    modalAccuracyBtn.innerHTML = ai.accuracy.score*100 ? ai.accuracy.score*10:"% Accuracy";
    const modalImages = document.getElementById('modal-Image');
    modalImages.innerHTML = ai.image_link[1];
    const modalText = document.getElementById('modal-text');
    modalText.innerHTML = ai.input_output_examples[0].input ? ai.input_output_examples[0].input:"Not text found";
    const modalParagraph = document.getElementById('modal-para');
    modalParagraph.innerHTML = ai.input_output_examples[0].input ? ai.input_output_examples[0].input:"Not yet! take a break";
 }

loadAi();



