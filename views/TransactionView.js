export default class TransactionView {

  /**
   * Create a <tr> HTML element with details in textContent of each <td>
   * @param {object} transactionDetails TransacationModel
   * 
   * @return {HTMLTableRowElement}
   */
  static createTransactionRow(transactionDetails) {
    const template = document.getElementById('rowTemplate');
    const clone = template.content.cloneNode(true);
    clone.querySelector('time').textContent = Intl.DateTimeFormat('en-CA').format(transactionDetails.date);
    clone.querySelector('.cell__from').textContent = transactionDetails.account.name;
    clone.querySelector('.cell__to').textContent = transactionDetails.payee.name;
    clone.querySelector('.cell__budget').textContent = transactionDetails.budget.name;
    clone.querySelector('.cell__outflow').textContent = Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(transactionDetails.amount);
    return clone;
  }

  /**
   * Add a row to a table body
   * @param {HTMLTableRowElement} row tr element with filled details 
   * @param {string} tbodySelector CSS selector for which tbody to appendTo 
   */
  static addRowToTable(row, tbodySelector) {
    const tbody = document.querySelector(tbodySelector);
    tbody.appendChild(row);    
  }
}