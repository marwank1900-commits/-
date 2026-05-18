let selectedProduct = "";
let selectedQuality = "";
let selectedColor = "";

let historyStack = []; // 🔥 للرجوع

/* =========================
   تحديث الملخص
========================= */
function updateSummary(){

document.getElementById("summaryName").innerText =
document.getElementById("name").value || "-";

document.getElementById("summaryPhone").innerText =
document.getElementById("phone").value || "-";

document.getElementById("summaryCategory").innerText =
document.getElementById("category").value || "-";

document.getElementById("summaryType").innerText =
selectedProduct + (selectedQuality ? " - " + selectedQuality : "");

document.getElementById("summaryColor").innerText =
selectedColor || "-";

document.getElementById("summarySize").innerText =
document.getElementById("size").value || "-";

/* 🔥 موقع الاستلام */
document.getElementById("summaryPickup").innerText =
document.getElementById("pickup").value || "-";

document.getElementById("summaryDetails").innerText =
document.getElementById("details").value || "-";
}
function scrollToForm(){
document.querySelector(".form-section")
.scrollIntoView({ behavior: "smooth" });
}

/* =========================
   حفظ خطوة للرجوع
========================= */
function pushState(html){
historyStack.push(html);
}

/* =========================
   زر الرجوع
========================= */
function goBack(){

if(historyStack.length > 1){
historyStack.pop();
document.getElementById("productsBox").innerHTML =
historyStack[historyStack.length - 1];
}
}

/* =========================
   عرض المنتجات
========================= */
function showCategoryProducts(){

let category = document.getElementById("category").value;
let box = document.getElementById("productsBox");

historyStack = [];
selectedProduct = "";
selectedQuality = "";
selectedColor = "";

box.innerHTML = "";

/* ===== جملة ===== */
if(category === "جملة"){

box.innerHTML = `
<div class="product" onclick="openProduct('تيشيرت')">
<img src="images/تيشرت-جمله.PNG">
<p>تيشيرت</p>
</div>

<div class="product" onclick="openProduct('كابات')">
<img src="images/كابات.PNG">
<p>كابات</p>
</div>

<div class="product" onclick="openProduct('يلقات')">
<img src="images/يلقات.PNG">
<p>يلقات</p>
</div>
`;

/* ===== تجزئة ===== */
}else if(category === "تجزئة"){

box.innerHTML = `
<div class="product" onclick="showSimpleColors('تيشيرت')">
<img src="images/تيشيرت-تجزئه.PNG">
<p>تيشيرت</p>
</div>

<div class="product" onclick="showSimpleColors('هودي')">
<img src="images/هودي.PNG">
<p>هودي</p>
</div>

<div class="product" onclick="showCapsColors()">
<img src="images/كابات.PNG">
<p>كابات</p>
</div>
`;
}

pushState(box.innerHTML);
updateSummary();
}

/* =========================
   الجملة: جودة + ألوان
========================= */
function openProduct(product){

selectedProduct = product;
selectedQuality = "";
selectedColor = "";

let box = document.getElementById("productsBox");

let html = "";

if(product === "تيشيرت"){

html = `
<div class="product" onclick="openQuality('تيشيرت','ممتازة')">
<p>خامة ممتازة</p>
</div>

<div class="product" onclick="openQuality('تيشيرت','متوسطة')">
<p>خامة متوسطة</p>
</div>

<button onclick="goBack()">رجوع</button>
`;

}else{

html = get25Colors(product);
}

box.innerHTML = html;
pushState(html);

updateSummary();
}

/* =========================
   جودة + 25 لون
========================= */
function openQuality(product, quality){

selectedProduct = product;
selectedQuality = quality;

let html = get25Colors(product);

document.getElementById("productsBox").innerHTML = html;
pushState(html);

updateSummary();
}

/* =========================
   25 لون
========================= */
function get25Colors(type){

let colors = [
"أبيض","أسود","أحمر","أزرق","أخضر",
"أصفر","رمادي","بني","بيج","بنفسجي",
"وردي","برتقالي","كحلي","زيتي","ذهبي",
"فضي","سماوي","تركوازي","نبيتي","ليموني",
"لافندر","طوبي","رمادي فاتح","رمادي غامق","عنابي"
];

let html = `<button onclick="goBack()">رجوع</button><br><br>`;

for(let i=0;i<colors.length;i++){
html += `
<div class="product" onclick="selectColor('${type} - ${colors[i]}')">
<p>${colors[i]}</p>
</div>
`;
}

return html;
}

/* =========================
   تجزئة: تيشيرت/هودي
========================= */
function showSimpleColors(type){

selectedProduct = type;
selectedQuality = "";
selectedColor = "";

let html = `
<button onclick="goBack()">رجوع</button><br><br>

<div class="product" onclick="selectColor('${type} - أبيض')">
<p>أبيض</p>
</div>

<div class="product" onclick="selectColor('${type} - أسود')">
<p>أسود</p>
</div>
`;

document.getElementById("productsBox").innerHTML = html;
pushState(html);

updateSummary();
}

/* =========================
   كابات التجزئة
========================= */
function showCapsColors(){

selectedProduct = "كابات";
selectedQuality = "";

let colors = [
"أبيض","أسود","أحمر","أزرق","أخضر",
"أصفر","رمادي","بني","كحلي","وردي"
];

let html = `<button onclick="goBack()">رجوع</button><br><br>`;

for(let i=0;i<colors.length;i++){
html += `
<div class="product" onclick="selectColor('كابات - ${colors[i]}')">
<p>${colors[i]}</p>
</div>
`;
}

document.getElementById("productsBox").innerHTML = html;
pushState(html);

updateSummary();
}

/* =========================
   اختيار اللون
========================= */
function selectColor(color){
selectedColor = color;
updateSummary();
}

/* =========================
   واتساب
========================= */
function sendWhatsApp(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let category = document.getElementById("category").value;
let size = document.getElementById("size").value;
let details = document.getElementById("details").value;

/* 🔥 موقع الاستلام */
let pickup = document.getElementById("pickup").value;

let message =
"مرحباً زخرفة\n\n" +
"الاسم: " + name + "\n" +
"الجوال: " + phone + "\n" +
"القسم: " + category + "\n" +
"المنتج: " + selectedProduct + "\n" +
"الجودة: " + selectedQuality + "\n" +
"اللون: " + selectedColor + "\n" +
"المقاس: " + size + "\n" +
"موقع الاستلام: " + pickup + "\n" +
"التفاصيل: " + details;

let number = "967784471471";

let url =
"https://api.whatsapp.com/send?phone=" +
number +
"&text=" +
encodeURIComponent(message);

window.open(url, "_blank");
}


updateSummary();