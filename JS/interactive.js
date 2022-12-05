let tbody = document.querySelector(".clients")
let th_name = document.querySelector("#name")
let th_email = document.querySelector("#email")
let th_cell = document.querySelector("#cell")
let th_city = document.querySelector("#city")
let btnAdd = document.querySelector(".btn-add-client")
let modal = document.querySelector(".modal")
let input = document.querySelectorAll(".div-input")
let form = document.querySelector(".form-clients")
let allInputsModal = modal.querySelectorAll("input")
let search = document.querySelector("#search")


let itens
let id

search.addEventListener("keyup", () => {
    filterNamesClients()
})

function filterNamesClients(){
    let tbodyRows, rows, filter
    filter = search.value.toUpperCase()
    tbodyRows = tbody.querySelectorAll("tr")
    for (let i = 0; i < tbodyRows.length; i++){
        rows = tbodyRows[i].querySelectorAll("th")[0]
        rows.innerHTML.toUpperCase().indexOf(filter) !== -1 ? tbodyRows[i].style.display = "" : tbodyRows[i].style.display = "none"
    }
}

const getItens = () => JSON.parse(localStorage.getItem('list')) ?? []
const setItens = () => localStorage.setItem('list', JSON.stringify(itens))

btnAdd.addEventListener("click", () => openModal())

function updateClient(index){ 
    openModal(true, index)
}

function deleteClient(index){
    itens.splice(index, 1)
    setItens()
    loadClients()
}

const insertClient = (client, index) => {
    let tr = document.createElement("tr")
        tr.innerHTML = `
                    <th>${client.name}</th>
                    <th>${client.email}</th>
                    <th>${client.cell}</th>
                    <th>${client.city}</th>
                    <th>
                        <button class='btn-th update' onclick='updateClient(${index})' aria-label='Update'>
                            <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class='btn-th delete' onclick='openTooltip(${index})'>
                            <i class="fa-sharp fa-solid fa-trash"></i>
                        </button>
                        <div class='tooltip-btn-delete' id='tooltip${index}'>
                            <p>Tem certeza?</p>
                            <p>Vai realmente remover ${client.name}?</p>
                            <div class='buttons-options'>
                                <button class='btn-tooltip confirm' onclick='deleteClient(${index})'><i class='fa-sharp fa-solid fa-check'></i></button>
                                <button class='btn-tooltip cancel' onclick='closeTooltip(${index})'><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                    </th>`
    tbody.appendChild(tr)    
}

const loadClients = () => {
    itens = getItens()
    tbody.innerHTML = ""
    itens.forEach((client, index) => {
        insertClient(client, index)
    })
}

form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!checkInupts()){
        return
    }
    
    if (id != undefined){
        itens[id].name = th_name.value
        itens[id].email = th_email.value
        itens[id].cell= th_cell.value
        itens[id].city = th_city.value
    }else{
        itens.push({name: th_name.value, email: th_email.value, cell: th_cell.value, city: th_city.value})
    }
    setItens()
    loadClients()
    id = undefined
    modal.classList.remove("active") 
})

const openModal = (edit=false, index=0) => {
    clearRegistration()
    removeAllTootips()
    modal.classList.add("active")
    modal.addEventListener("click", (event) =>{
        if (event.target.className.indexOf("modal active") !== -1){
            modal.classList.remove("active")
        }
    })

    if (edit){
        th_name.value = itens[index].name
        th_email.value = itens[index].email
        th_cell.value = itens[index].cell
        th_city.value = itens[index].city
        id = index
    }else{
        th_name.value = ""
        th_email.value = ""
        th_cell.value = ""
        th_city.value = ""
        id = undefined
    }
    setItens()
}

function  validateRegistration(i){
    let validateEmail = /^[\w.]+\@[\w]+\.[\w.]+/i
    let validateCell = /^(\(?\d{2}\)?\s?)?\d{4}\-\d{4}$/i

    if (allInputsModal[i].value.trim()  === ""){
        input[i].className = "div-input error"
    }else{
        
        if (i === 1 && validateEmail.test(allInputsModal[i].value)){   
            input[i].className = "div-input sure"
        }else if (i === 2 && validateCell.test(allInputsModal[i].value)){    
            input[i].className = "div-input sure"
        }else if (i !== 1 && i !== 2){
            input[i].className = "div-input sure"
        }else{
            input[i].className = "div-input error"
        }
    }
}

const checkInupts = () =>{
    let isInputValidate = true
    for (let i = 0; i < allInputsModal.length; i++){
        if (allInputsModal[i].value.trim() === "" || input[i].className == "div-input error"){
            input[i].className = "div-input error"
            allInputsModal[i].value = ""
            isInputValidate = false
        }
    }
    return isInputValidate 
}

const clearRegistration = () =>{
    for (let i = 0; i < input.length; i++){
        input[i].className = "div-input"
    }
}

function openTooltip(index){
    removeAllTootips()
    let tooltip = document.querySelector("#tooltip"+index)
    tooltip.classList.add("active-tooltip")
}

function closeTooltip(index){
    let tooltip = document.querySelector("#tooltip"+index)
    tooltip.classList.remove("active-tooltip")
}

const removeAllTootips = () => {
    let tooltips = document.querySelectorAll(".active-tooltip")
    for (let i = 0; i < tooltips.length; i++){
        tooltips[i].classList.remove("active-tooltip")
    }
}

loadClients()


