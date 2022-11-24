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
    input.setAttribute('name',`select__row`)
    input.setAttribute('id',`select__row--${index}`)
    input.setAttribute('type','checkbox')
    td.appendChild(label)
    td.appendChild(input)
    row.firstChild.insertBefore(td, row.firstChild.children[0])
    return row
  }

  /**
   * activate Transaction Modal
   */
   static showTransactionForm(){
    document.querySelector('dialog').showModal()
  }

  /**
   * Delete the Buttons that modify the transaction
   * @param {HTMLInputElement} inputCheckbox HTML Input Checkbox
   */
  static deleteTransactionModifyButtons (inputCheckbox) {
    inputCheckbox.closest('td').querySelectorAll('button').forEach((el) => el.remove());
  }

  /**
   * Add button to Remove transaction row
   * @param {HTMLInputElement} inputCheckbox HTML Input Checkbox
   */
  static addTransactionRemovalButton (inputCheckbox) {
        if ('INPUT' !== inputCheckbox.nodeName && 'checkbox' !== inputCheckbox.type) return;
        if (inputCheckbox.checked) {
          // Create Remove button
          const delButton = document.createElement('button');
          delButton.setAttribute('type', 'button');
          delButton.classList.add('transaction__remove');
          delButton.textContent = 'Remove Transaction'
          delButton.addEventListener('click', ()=>{
            const body = delButton.closest('tbody');
            body.deleteRow(delButton.dataset.row)
          })
          // Add button to cell
          const rowIndex = inputCheckbox.closest('tr').rowIndex - 1
          delButton.dataset.row = rowIndex;
          inputCheckbox.closest('td').appendChild(delButton)
        }
  }
  
  /**
   * Add button to Edit transaction row
   * @param {HTMLInputElement} inputCheckbox HTML Input Checkbox
   */
  static addTransactionEditButton (inputCheckbox) {
        if ('INPUT' !== inputCheckbox.nodeName && 'checkbox' !== inputCheckbox.type) return;
        if (inputCheckbox.checked) {
          // Create Edit button
          const editButton = document.createElement('button');
          editButton.setAttribute('type', 'button')
          editButton.classList.add('transaction__edit')
          editButton.textContent = 'Edit Transaction'
          editButton.addEventListener('click', ()=>{
            // Trigger Transaction Edit Dialog
            this.showTransactionForm()
          })
          // Add button to cell
          const rowIndex = inputCheckbox.closest('tr').rowIndex - 1
          editButton.dataset.row = rowIndex;
          inputCheckbox.closest('td').appendChild(editButton)
        }
  }

  /**
   * add change Listener to Transaction checkboxes
   */
   static addListenerOnCheckboxes () {
    const checkboxes = document.querySelectorAll('[name="select__row"]')
    checkboxes.forEach((cb)=>{
      cb.addEventListener('change', (event) => {
        const checkbox = event.target;
        if ('INPUT' !== checkbox.nodeName && 'checkbox' !== checkbox.type) return;
        if (checkbox.checked) {
          this.addTransactionRemovalButton(checkbox)
          this.addTransactionEditButton(checkbox)
        } else {
          this.deleteTransactionModifyButtons(checkbox);
        }
      })
    })
  }

  /**
   * Add a Close listener to the Dialog Cancel button
   */
  static addCloseListenerTransactionForm() {
    const dialog = document.querySelector('dialog');
    document.querySelector('dialog button.close').addEventListener('click', () => {
      dialog.close();
    })    
  }
}