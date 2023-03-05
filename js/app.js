const loadOpen = (seeMoreBtnCall) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayOpen(data.data.tools, seeMoreBtnCall))
}

const displayOpen = (tools, seeMoreBtnCall) => {
    const universeContainer = document.getElementById('universe-container')
    universeContainer.innerText = '';

    const showAllbtn = document.getElementById('seeMoreBtn');
    if (seeMoreBtnCall && tools.length > 6) {
        tools = tools.slice(0, 6);
        showAllbtn.classList.remove('d-none')
    }
    else {
        showAllbtn.classList.add('d-none')
    }
    tools.forEach(tool => {
        const universeDive = document.createElement('div');
        universeDive.classList.add('col');
        universeDive.innerHTML = `
        <div class="card h-100">
            <img src="${tool.image}" class="card-img-top" alt="image not found">
            <div class="card-body">
                <h4 class="card-title">features</h4>
                <p class="card-text">
                    <ol>
                        <li>${tool.features[0]}</li>
                        <li>${tool.features[1]}</li>
                        <li>${tool.features[2]}</li>
                    </ol>
                </p><hr>

                <h5 >${tool.name}</h5>
                <div class = "d-flex justify-content-between" >
                    <div class="footer-button d-flex"><i class="fa-regular fa-calendar-days p-1 text-info-emphasis"></i>${tool.published_in}</div>

                    <div> <i onclick="loadUniverseDetails('${tool.id}')" class="fa-solid fa-circle-arrow-right text-info" data-bs-toggle="modal" data-bs-target="#universeDetailModal"></i></div>
                </div>
            </div>
        </div `;
        universeContainer.appendChild(universeDive)
    });
    toggleLoader(false);
}
document.getElementById('seeMoreBtn').addEventListener('click', function () {
    toggleLoader(true);
    loadOpen()
})
const toggleLoader = isLoading => {
    const loadSection = document.getElementById('loader');
    if (isLoading) {
        loadSection.classList.remove('d-none')
    }
    else { loadSection.classList.add('d-none') }
}

/* loading details */
const loadUniverseDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayUniverseDetails(data.data);
}
const displayUniverseDetails = tools => {
    const cardPart2 = document.getElementById('cardPart2');
    cardPart2.innerText = '';
    const newcardadd2 = document.createElement('div');
    newcardadd2.innerHTML = `
        <div class="top-right">${tools.accuracy.score ? tools.accuracy.score : 'not found'} accuracy</div>
        <img class='img-fluid' src="${tools.image_link ? tools.image_link[0] : 'not found'}" alt="image not found">
        <h5 class="p-1">${tools.input_output_examples[0] ? tools.input_output_examples[0].input : 'not found'}</h5>
        <p>${tools.input_output_examples[0] ? tools.input_output_examples[0].output : 'not found'}</p>
    `;
    cardPart2.appendChild(newcardadd2);
    displayCardPart2(tools);

}

const displayCardPart2 = tools => {
    console.log(tools.accuracy.score);
    const cardPart1 = document.getElementById('cardPart1');
    cardPart1.innerText = '';
    const newcardadd1 = document.createElement('div');
    newcardadd1.innerHTML = `
        <p>${tools.description}</p>
        <div class="row">
            <div class="col border border-secondary-subtle rounded-4 text-center m-1">
            <span>${tools.pricing[0] ? tools.pricing[0].price : 'not found'}</span><span>${tools.pricing[0] ? tools.pricing[0].plan : 'not found'}</span>
            </div>
            <div class="col border border-secondary-subtle rounded-4 text-center m-1">
            <span>${tools.pricing[1].price}</span><span>${tools.pricing[1].plan}</span>
            </div>
            <div class="col border border-secondary-subtle rounded-4 text-center m-1">
            <span>${tools.pricing[2].price}</span><span>${tools.pricing[2].plan}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <h4>Features</h4>
                <ul>
                    <li>${tools.features[1].feature_name}</li>
                    <li>${tools.features[2].feature_name}</li>
                    <li>${tools.features[3].feature_name}</li>
                    <li>${tools.features[4] ? tools.features[4].feature_name : 'not found'}</li>
                </ul>
            </div>
            <div class="col">
                <h4>Integrations</h4>
                <ul>
                    <li>${tools.integrations[0]}</li>
                    <li>${tools.integrations[1]}</li>
                    <li>${tools.integrations[2]}</li>
                </ul>
            </div>
        </div>
    `;
    cardPart1.appendChild(newcardadd1);
}

loadOpen(6);