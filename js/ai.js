
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
    const modalContainer = document.getElementById('modal-body');
    modalContainer.textContent = '';
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    <div  class="row row-cols-1 row-cols-md-2 container-fluid" style= "height: 400px: width: 400px;">
              <div class="d-flex justify-content-lg-center container-fluid ">
                <div class="col-md-6 p-2 rounded border border-danger ms-5" style="height: 600px; width: 300px;">
                  <div>
                    <h5 id="modal-container">${ai.description}</h5>
                    <div class="d-flex justify-content-evenly mt-3 mb-5">
                      <div class="me-2 border rounded-3 p-1 text-center container-fluid" style="height: 150px; width: 150px;">
                        <p >${ai.pricing[0].price ? ai.pricing[0].price :"Free of cost/"}</p>
                        <p >${ai.pricing[0].plan}</p>
                      </div>
                      <div class="me-2 border rounded-3 p-1 text-center container-fluid" style="height: 150px; width: 150px;">
                        <p>${ai.pricing[1].price ? ai.pricing[1].price :"Free of cost/"}</p>
                        <p >${ai.pricing[1].plan}</p>
                      </div>
                      <div class="me-2 border rounded-3 p-1 text-center container-fluid" style="height: 150px; width: 150px;">
                        <p >${ai.pricing[2].price ? ai.pricing[2].price :"Free of cost/"}</p>
                        <p>${ai.pricing[2].plan}</p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-evenly mt-2 container-fluid">
                      <div>Feature:
                        <ul>
                          <li >${ai.features[1].feature_name}</li>
                          <li >${ai.features[2].feature_name}</li>
                          <li >${ai.features[3].feature_name}</li>
                        </ul>
                      </div>
                      <div>Integration:
                        <ul>
                          <li>${ai.integrations[0] ? ai.integrations[0]:"no data found"}</li>
                          <li >${ai.integrations[1] ? ai.integrations[0]:"no data found"}</li>
                          <li>${ai.integrations[2] ? ai.integrations[0]:"no data found"}</li>
                          
                        </ul>
  
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 p-1 mb-2 border rounded ms-3 container-fluid " style="height: 400px; width: 300px;">
                  <div class="text-end">
                    <button id="button01" type="button" class="btn btn-danger" style="position:relative; top:43px; right:10px;">${(ai.accuracy.score)*100 ? (ai.accuracy.score)*10:""}% Accuracy</button>
                  </div>
                  <img id="modal-Image" src="${ai.image_link[0]}" alt="No image Found ${ai.tool_name}" class="img-fluid rounded-start ">
                  <div class="mt-2 text-centre" >
                    <h4>${ai.input_output_examples[0].input ? ai.input_output_examples[0].input:"Not text found"}</h4>
                    <p >${ai.input_output_examples[0].input ? ai.input_output_examples[0].input:"Not yet! take a break"}</p>
                  </div>
  
                </div>
  
              </div>
  
            </div>
    
    `;
    modalContainer.appendChild(modalDiv);

 }

loadAi();



