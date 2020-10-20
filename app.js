// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyALtISPxt5Y9NUH1f9ejyyCRTh0u8YUK-Q',
  authDomain: 'shipping-169e3.firebaseapp.com',
  databaseURL: 'https://shipping-169e3.firebaseio.com',
  projectId: 'shipping-169e3',
  storageBucket: 'shipping-169e3.appspot.com',
  messagingSenderId: '1011621550286',
  appId: '1:1011621550286:web:418339737cc5ec845d989f',
  measurementId: 'G-6K838NCTGX',
});

let mockData = [];

// Firestore Database
const db = firebase.firestore();

const trackForm = document.querySelector('#track_form');
const inputField = document.querySelector('#trackingId');
const table = document.querySelector('table');
const loader = document.querySelector('.lds-spinner');

// Handle event upon form submission
trackForm.onsubmit = function(e) {
  e.preventDefault(); // Prevent page reload

  showLoader(); // show loading indicator

  fetchData().then(() => {
    setTimeout(() => {
      removeLoader();
      generateTableHead(table, Object.keys(mockData[0]));
      generateTableBody(table, mockData);
    }, 1000 * 4);
  });
};

const fetchData = async () => {
  db.collection('users').get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      mockData.push(doc.data());
      console.log(mockData);
    });
  });
};

const generateTableHead = (table, data) => {
  const thead = table.createTHead();
  const row = thead.insertRow();

  for (let key of data) {
    const th = document.createElement('th');

    const text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};

const generateTableBody = (table, arrayOfData) => {
  const tbody = table.createTBody();

  for (let element of arrayOfData) {
    let row = tbody.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
};

const showLoader = () => {
  loader.style.display = 'block';
};

const removeLoader = () => {
  loader.style.display = 'none';
};
