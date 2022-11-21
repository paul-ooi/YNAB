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
    clone.querySelector('.cell__type').textContent = transactionDetails.type;
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
    const modifiedRow = TransactionView.addTransactionCheckbox(row, tbody.rows.length)
    tbody.appendChild(modifiedRow);    
  }

  /**
   * Add a unique checkbox for this row to act as a toggle for other components
   * @param {HTMLTableRowElement} row 
   * @param {number} index row index to assign
   */
  static addTransactionCheckbox(row, index) {
    const td = document.createElement('td');
    const label = document.createElement('label');
    const input = document.createElement('input');
    td.classList.add('cell__modify')
    label.setAttribute('for',`select__row--${index}`)
    label.textContent = 'Select Transaction'
    input.setAttribute('name',`select__row--${index}`)
    input.setAttribute('id',`select__row--${index}`)
    input.setAttribute('type','checkbox')
    td.appendChild(label)
    td.appendChild(input)
    row.firstChild.insertBefore(td, row.firstChild.children[0])
    return row
  }


}