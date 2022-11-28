import TransactionModel from './TransactionModel.js';

export default class DbModel {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.version = version;
  }


  setDb (event) {
    this.db = event.target.result;
  }

  /**
   * Make Request to open DB, and add event listeners
   */
  requestDbOpen() {
    const request = indexedDB.open(this.dbName, this.version);
    this.addRequestListeners(request);
  }

  getTransaction(db) {

  }


  /**
   * Generic Error handler for DB request
   * @param {EventTarget} event EventTarget object instance
   */
  errorHandler(event) {
    console.error(event)
  }

  /**
   * Blocked handler for DB request
   * @param {EventTarget} event EventTarget object instance
   */
  blockedHandler(event) {
    console.log('blocked');
    console.log(event.target.result);
  }

  /**
   * Upgrade Needed handler for DB request
   * @param {EventTarget} event EventTarget object instance
   */
  upgradeneededHandler(event) {
    console.log('onupgradeneeded');

    const db = event.target.result;
    this.db = event.target.result;
    // this.setDb(event)
    console.log(db.objectStoreNames.contains('transactions'));
    // const transactionStore = db.deleteObjectStore("transactions");
    if (!db.objectStoreNames.contains('transactions')) {
      const transactionStore = db.createObjectStore("transactions", { keyPath: "id", autoIncrement: true });
    }

    if (!db.objectStoreNames.contains('accounts')) {
      const accountStore = db.createObjectStore("accounts", { keyPath: "id", autoIncrement: true });
    }

    if (!db.objectStoreNames.contains('payees')) {
      const payeeStore = db.createObjectStore("payees", { keyPath: "id", autoIncrement: true });
    }

    if (!db.objectStoreNames.contains('budgets')) {
      const budgetStore = db.createObjectStore("budgets", { keyPath: "id", autoIncrement: true });
    }
  }

  /**
   * Success handler for DB request
   * @param {EventTarget} event EventTarget object instance
   */
  successHandler(event) {

    console.log('success');
    console.log(event);
    const db = event.target.result;
    this.db = event.target.result;
      
    const trsnct = db.transaction(['transactions'], "readwrite");
    console.log(trsnct);
    trsnct.oncomplete = (event) => {
      console.log('Complete');
      console.log(event);
    }
    trsnct.onerror = (event) => {
      console.error('transaction error');
      console.error(event);
    }
    const objectStore = trsnct.objectStore("transactions");
  console.debug('objectStore', objectStore);
    // data.forEach((transaction)=> {
    //   const t = new TransactionModel(transaction)
    //   const request = objectStore.add(t);
    //     request.onsuccess = (event) => {
    //       // event.target.result === customer.ssn;
    //       console.log('success');
    //       console.log(event);
    //     };
    // })
  }

  /**
   * 
   * @param {IDBRequest} request object from IDBFactory.open()
   */
  addRequestListeners(request) {
    request.onblocked = this.blockedHandler;
    request.onupgradeneeded = this.upgradeneededHandler;
    request.onsuccess = this.successHandler;
    request.onerror = this.errorHandler;

    // Set this Request to be referenced later
    this.request = request
  }
}