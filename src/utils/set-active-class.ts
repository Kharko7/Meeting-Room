export const setActiveClass = (language: string | null) => {
  setTimeout(() => {
    const calendar = document.getElementById('calendar') as HTMLElement;
    if (calendar) {
      if (language === 'ua') {
        const button = calendar.querySelector('.fc-buttonUa-button') as HTMLButtonElement;

        button.classList.add('active')
      } else {
        const button = calendar.querySelector('.fc-buttonEn-button') as HTMLButtonElement;

        button.classList.add('active')
      }
    }
  }, 0)
}