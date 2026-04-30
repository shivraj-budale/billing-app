let total = 0;
let items = [];

function addItem() {
    let item = document.getElementById("item").value;
    let price = parseFloat(document.getElementById("price").value);
    let qty = parseInt(document.getElementById("qty").value);

    if (!item || !price || !qty) return alert("Fill all fields");

    let itemTotal = price * qty;
    total += itemTotal;

    items.push({ item, price, qty, itemTotal });

    document.getElementById("bill").innerHTML += `
    <tr>
      <td>${item}</td>
      <td>${price}</td>
      <td>${qty}</td>
      <td>${itemTotal}</td>
    </tr>
  `;

    document.getElementById("grandTotal").innerText = total;

    // Clear inputs
    document.getElementById("item").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
}

function clearBill() {
    items = [];
    total = 0;
    document.getElementById("bill").innerHTML = "";
    document.getElementById("grandTotal").innerText = "0";
}

function generateReceipt() {
    let receiptHTML = "";

    items.forEach(i => {
        receiptHTML += `
      <p>${i.item}  x${i.qty}  ₹${i.itemTotal}</p>
    `;
    });

    document.getElementById("receiptItems").innerHTML = receiptHTML;
    document.getElementById("receiptTotal").innerText = total.toFixed(2);
}

function generateQR() {
    let upiID = "budaleshivrajnagesh@yapl"; // CHANGE THIS
    let name = "royal feel "; // CHANGE THIS

    let upiURL = `upi://pay?pa=${upiID}&pn=${name}&am=${total.toFixed(2)}&cu=INR`;

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: upiURL,
        width: 120,
        height: 120
    });
}

function printBill() {
    if (items.length === 0) return alert("Add items first");

    generateReceipt();
    generateQR();

    window.print();
}