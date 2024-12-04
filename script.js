const steps = document.querySelectorAll(".form-step")
const controls = document.querySelectorAll(".control .step")
const nextButton = document.querySelector(".next")
const prevButton = document.querySelector(".prev")
const confirmButton = document.querySelector(".confirm")

const plans = document.querySelectorAll(".plan")
const addons = document.querySelectorAll(".add")
let currentStep = 1
let totalStep = 4

function processingStep() {
  controls[currentStep - 1].classList.add("active")
  steps[currentStep - 1].classList.add("active")
}
function updateForm() {
  controls.forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.step) === currentStep)
  })
  steps.forEach((step) => {
    step.classList.toggle("active", parseInt(step.dataset.step) === currentStep)
  })
  prevButton.classList.toggle("hidden", currentStep === 1)
}
controls.forEach((btn) => btn.addEventListener("click", chooseStep))
nextButton.addEventListener("click", () => {
  if (currentStep === totalStep) return
  currentStep += 1
  updateForm()
})
prevButton.addEventListener("click", () => {
  if (currentStep === totalStep) return
  currentStep += 1
  updateForm()
})
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((pl) => {
      if (pl === plan) plan.classList.add("selected")
      else {
        pl.classList.remove("selected")
      }
    })
  })
})
addons.forEach((add) => {
  add.addEventListener("click", (e) => {
    console.log(e.target)
    if (add.classList.contains("selected")) {
      add.classList.remove("selected")
      add.querySelector('input[type="checkbox"]').checked = false
    } else {
      add.classList.add("selected")
      add.querySelector('input[type="checkbox"]').checked = true
    }
  })
})
function chooseStep(e) {
  currentStep = parseInt(e.target.dataset.step)
  updateForm()
}
updateForm()
