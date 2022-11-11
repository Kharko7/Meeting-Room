export const disabledPressedButton = () => {
  const calendar = document.getElementById('calendar') as HTMLElement;
  const buttonMonth = calendar.querySelector('.fc-dayGridMonth-button') as HTMLButtonElement;
  const buttonWeek = calendar.querySelector('.fc-timeGridWeek-button') as HTMLButtonElement;
  const buttonDay = calendar.querySelector('.fc-timeGridDay-button') as HTMLButtonElement;
  const buttonList = calendar.querySelector('.fc-listWeek-button') as HTMLButtonElement;
  if (buttonMonth.getAttribute('aria-pressed') === "true") {
    buttonMonth.setAttribute('disabled', '')
  } else {
    buttonMonth.removeAttribute('disabled')
  }
  if (buttonWeek.getAttribute('aria-pressed') === "true") {
    buttonWeek.setAttribute('disabled', '')
  } else {
    buttonWeek.removeAttribute('disabled')
  }
  if (buttonDay.getAttribute('aria-pressed') === "true") {
    buttonDay.setAttribute('disabled', '')
  } else {
    buttonDay.removeAttribute('disabled')
  }
  if (buttonList.getAttribute('aria-pressed') === "true") {
    buttonList.setAttribute('disabled', '')
  } else {
    buttonList.removeAttribute('disabled')
  }
}