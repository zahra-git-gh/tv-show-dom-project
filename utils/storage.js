function setData(data) {
    localStorage.setItem('id', JSON.stringify(data));
}
function getDataStorage(term) {
    const data = localStorage.getItem(term);
    return JSON.parse(data);
  }
  export{setData, getDataStorage}