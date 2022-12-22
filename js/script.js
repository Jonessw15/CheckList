// Seleção de Elementos
const checkForm = document.querySelector('#check-form')
const checkInput = document.querySelector('#check-input')
const checkList = document.querySelector('#check-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelEditBtn = document.querySelector('#cancel-edit-btn')

let oldInputValue
// Funções
const saveCheck = (text) => {
    const check = document.createElement('div')
    check.classList.add('check')

    const checkTitle = document.createElement('h3')
    checkTitle.innerText = text
    check.appendChild(checkTitle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-check')
    doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    check.appendChild(doneBtn)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-check')
    editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>"
    check.appendChild(editBtn)
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-check')
    deleteBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>"
    check.appendChild(deleteBtn)

    checkList.appendChild(check)

    checkInput.value = ''
    checkInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    checkForm.classList.toggle('hide')
    checkList.classList.toggle('hide')
}

const updateCheck = (text) => {
    const checks = document.querySelectorAll('.check')
    checks.forEach((check) => {
        let checkTitle = check.querySelector('h3')
            checkTitle.innerText = text
    })
}

// Eventos
checkForm.addEventListener('submit', (e) => {
    e.preventDefault() /* Para trabalhar com frontend o preventDefalt() 
                          não deixa o formulário ser jogado para o backend */
    const inputValue = checkInput.value

    if(inputValue) {
        saveCheck(inputValue)
    }
})

document.addEventListener('click', (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest('div')
    let checkTitle

    if (parentEl && parentEl.querySelector('h3')) {
        checkTitle = parentEl.querySelector('h3').innerText
    }

    if (targetEl.classList.contains('finish-check')) {
        parentEl.classList.toggle('done')
    }

    if(targetEl.classList.contains('remove-check')) {
        parentEl.remove()
    }

    if(targetEl.classList.contains('edit-check')) {
        toggleForms()

        editInput.value = checkTitle
        oldInputValue = checkTitle
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault()

    toggleForms()
})

editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateCheck(editInputValue)
    }

    toggleForms()
})