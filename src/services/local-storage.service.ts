const meetingRoom = 'meetingRoom'

const storageMeetingRoom = {
  weekends: false,
  language: 'en',
  token: ''
}

if (!localStorage.getItem(meetingRoom)) {
  localStorage.setItem(meetingRoom, JSON.stringify(storageMeetingRoom));
}

export const getFromLocalStorage = (name: string) => {
  const localObject = JSON.parse(localStorage.getItem(meetingRoom) && localStorage.getItem(meetingRoom) || '');
  if (!localObject) {
    return null;
  }
  return localObject[name];
};

export const setToLocalStorage = (name: string, item: string | number | boolean) => {
  const localObject = JSON.parse(localStorage.getItem(meetingRoom) || '');
  if (localObject) {

    localObject[name] = item;
    localStorage.setItem(meetingRoom, JSON.stringify(localObject));
  }
};

export const removeFromLocalStorage = (name: string) => {
  const localObject = JSON.parse(localStorage.getItem(meetingRoom) || '')
  if (localObject) {
    delete localObject[name]
    localStorage.setItem(meetingRoom, JSON.stringify(localObject))
  }
}
