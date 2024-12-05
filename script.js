const steps = document.querySelectorAll(".form-step")
const controls = document.querySelectorAll(".control .step")
const nextButton = document.querySelector(".next")
const prevButton = document.querySelector(".prev")
const confirmButton = document.querySelector(".confirm")
const checkboxunit = document.querySelector(".time")
const plans = document.querySelectorAll(".plan")
const addons = document.querySelectorAll(".add")
const planInput = document.querySelector(".plan-input")
const contentService = document.querySelector(".bill .content")
let currentStep = 1
let totalStep = 4
let unit = "mo"
const planPrice = {
  mo: [9, 12, 15],
  yr: [90, 120, 150],
}
const addPrice = {
  mo: [1, 2, 2],
  yr: [10, 20, 20],
}

function init() {
  plans[0].classList.add("selected")
  planInput.value = planPrice[unit][0]
  document.querySelector(".monthly").classList.add("selected")
  plans.forEach((pl, index) => {
    pl.querySelector("span").classList.add("d-none")
  })

  addons.forEach((add, index) => {
    add.querySelector(
      ".price"
    ).textContent = `$${addPrice[unit][index]}/${unit}`
  })

  document.querySelector(".bill .header h3").textContent =
    document.querySelector(".plan.selected h3").textContent +
    "(" +
    (unit === "mo" ? "Monthly" : "Yearly") +
    ")"
  document.querySelector(".bill .header p").textContent =
    document.querySelector(".plan.selected p").textContent
}
function initEvent() {
  plans.forEach((plan) => {
    plan.addEventListener("click", () => {
      plans.forEach((pl, index) => {
        if (pl === plan) {
          plan.classList.add("selected")
          document.querySelector(".bill .header h3").textContent =
            document.querySelector(".plan.selected h3").textContent +
            "(" +
            (unit === "mo" ? "Monthly" : "Yearly") +
            ")"
          document.querySelector(".bill .header p").textContent =
            document.querySelector(".plan.selected p").textContent
          planInput.value = planPrice[unit][index]
        } else {
          pl.classList.remove("selected")
        }
      })
    })
  })
  addons.forEach((add, index) => {
    add.addEventListener("click", (e) => {
      add.querySelector('input[type="checkbox"]').value = addPrice[unit][index]
      if (add.classList.contains("selected")) {
        add.classList.remove("selected")
        add.querySelector('input[type="checkbox"]').checked = false
      } else {
        add.classList.add("selected")
        add.querySelector('input[type="checkbox"]').checked = true
      }
    })
  })
}
init()
initEvent()
function updateForm() {
  controls.forEach((btn) => {
    btn.classList.toggle("active", parseInt(btn.dataset.step) === currentStep)
  })
  steps.forEach((step) => {
    step.classList.toggle("active", parseInt(step.dataset.step) === currentStep)
  })
  prevButton.classList.toggle("hidden", currentStep === 1)
}
// controls.forEach((btn) => btn.addEventListener("click", chooseStep))
nextButton.addEventListener("click", () => {
  if (!validateForm()) return
  currentStep += 1
  if (currentStep === totalStep) {
    confirmButton.style.display = "block"
    nextButton.style.display = "none"
    let selected = document.querySelectorAll(".add.selected")
    let html = ""
    let total = parseInt(planInput.value)
    selected.forEach((sl) => {
      total += parseInt(sl.querySelector('input[type="checkbox"]').value)
      html += `<div class="service">
                <h3>${sl.querySelector(".description h3").textContent}</h3>
                <span>${sl.querySelector(".price").textContent}</span>
              </div>
            `
    })
    document.querySelector(".total-service h3").textContent = `Total(per ${
      unit === "mo" ? "month" : "year"
    })`
    document.querySelector(
      ".total-service span"
    ).textContent = `$${total}/${unit}`
    contentService.innerHTML = html
  } else {
  }
  updateForm()
})
prevButton.addEventListener("click", () => {
  if (currentStep === 1) return
  if (currentStep <= totalStep) {
    confirmButton.style.display = "none"
    nextButton.style.display = "block"
  }
  currentStep -= 1
  updateForm()
})

function chooseStep(e) {
  if (!validateForm()) return
  currentStep = parseInt(e.target.dataset.step)
  updateForm()
}
updateForm()
function validateForm() {
  switch (currentStep) {
    case 1:
      return validateStep1()
    default:
      return true
  }
}
function validateStep1() {
  const inputs = document.querySelectorAll(".form-step:first-child input")
  let isError = true
  inputs.forEach((ip) => {
    if (ip.value.trim() === "") {
      ip.closest(".input-group").classList.add("error")
      isError = false
      return false
    } else {
      ip.closest(".input-group").classList.remove("error")
    }
    // ip.closest(".input-group").classList.toggle("error", ip.value.trim() === "")
  })
  return isError
}
checkboxunit.addEventListener("click", () => {
  if (checkboxunit.checked) {
    unit = "yr"
    document.querySelector(".yearly").classList.add("selected")
    document.querySelector(".monthly").classList.remove("selected")
    plans.forEach((pl, index) => {
      pl.querySelector("span").classList.remove("d-none")
      pl.querySelector(
        ".price"
      ).textContent = `${planPrice[unit][index]}$/${unit}`
      if (pl.classList.contains("selected")) {
        planInput.value = planPrice[unit][index]
      }
    })
  } else {
    unit = "mo"
    document.querySelector(".monthly").classList.add("selected")
    document.querySelector(".yearly").classList.remove("selected")
    plans.forEach((pl, index) => {
      pl.querySelector("span").classList.add("d-none")
      pl.querySelector(
        ".price"
      ).textContent = `${planPrice[unit][index]}$/${unit}`
      if (pl.classList.contains("selected")) {
        planInput.value = planPrice[unit][index]
      }
    })
  }
  addons.forEach(
    (add, index) =>
      (add.querySelector(
        ".price"
      ).textContent = `$${addPrice[unit][index]}/${unit}`)
  )
  document.querySelector(".bill .header h3").textContent =
    document.querySelector(".plan.selected h3").textContent +
    " (" +
    (unit === "mo" ? "Monthly" : "Yearly") +
    ")"
})
confirmButton.addEventListener("click", () => {
  document.querySelector(".form-step:nth-child(4)").style.display = "none"
  document.querySelector(".form-step:last-child").style.display = "block"
  document.querySelector(".form-navigate").style.display = "none"
})
