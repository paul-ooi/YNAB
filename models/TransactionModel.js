import Account from '../src/Account';
import Budget from '../src/Budget.js';
import Payee from '../src/Payee.js';
import Category from '../src/Category.js';

export default class TransactionModel {
  constructor(transaction) {
    this.type = transaction.type
    switch (this.type) {
      case 'transfer':
        this.setupTransferTransactionProperties(transaction);
        break;

      case 'multi':
        this.setupMultiTransactionProperties(transaction);
        break;
        
      case 'single':
      default:
        this.setupSingleTransactionProperties(transaction);
        break;
    }
  }

  /**
   * Assign properties significant to Single transaction
   * @param {Object} transactionData object of transaction data from JSON or DB
   */
  setupSingleTransactionProperties(transactionData){
    this.account = Account.getById(transactionData.from)
    this.payee = Payee.getById(transactionData.to)
    this.budget = Budget.getById(transactionData.budget)
    // this.memo = transactionData.memo
    this.date = transactionData.date
    this.amount = transactionData.amount
  }

  /**
   * Assign properties significant to Multi-split transaction
   * @param {Object} transactionData object of transaction sata from JSON or DB
   */
  setupMultiTransactionProperties(transactionData){
    this.account = Account.getById(transactionData.from)
    this.payee = Payee.getById(transactionData.to)
    this.budget = Budget.getById(transactionData.budget)
    // this.memo = transactionData.memo
    this.date = transactionData.date
    this.amount = transactionData.amount
    this.subTransactions = transactionData.subTransactions
  }

  /**
   * Assign properties significant to Transfer transaction
   * @param {Object} transactionData object of transaction sata from JSON or DB
   */
  setupTransferTransactionProperties(transactionData){
    this.account = Account.getById(transactionData.from)
    this.payee = Account.getById(transactionData.to)
    this.budget = Budget.getById(transactionData.budget)
    // this.memo = transactionData.memo
    this.date = transactionData.date
    this.amount = transactionData.amount
  }
}