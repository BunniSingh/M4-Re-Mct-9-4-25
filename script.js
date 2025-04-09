(function () {
  let rightContainer = document.querySelector(".right");
  let logout = document.querySelector(".logout");
  let showCard = document.querySelector(".show-product-details");
  const checkboxes = document.querySelectorAll(".filter-checkbox");

  showCard.style.display = 'none'

  let userData = JSON.parse(localStorage.getItem("userData")) || "";

  if (!userData || !userData.isLogin) {
    window.location.href = "/login/login.html";
  }

  let products = [];
  async function fetchData() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    products = data;
    showProductOnDisplay(data);
  }
  fetchData();

  function showProductOnDisplay(product) {
    rightContainer.innerHTML = "";
    product.forEach((prod) => {
      rightContainer.innerHTML += `
        <div class="card">
          <p class="rating">${prod.rating.rate}</p>
          <div class="product-image">
            <img src="${prod.image}">
          </div>
          <div class="product-details">
            <p class="description">${prod.title}</p>
            <p class="price">${prod.price} $</p>
            <div class="action-btn">
              <button class="product-details-btn" data-id="${prod.id}">Details</button>
              <button class="mark-as-favorite">💖</button>
            </div>
          </div>
        </div>
      `;
    });


    // show product details
    rightContainer.addEventListener("click", (e) => {
      showCard.style.display = 'flex'
      if (e.target.classList.contains("product-details-btn")) {
        const productId = e.target.getAttribute("data-id");
        const prod = product.find((p) => p.id == productId);

        showCard.innerHTML = `
            <div class="card">
                <p onclick="document.querySelector('.show-product-details').style.display = 'none'" class="close-btn">X</p>

                <div class="product-image">
                    <img src="${prod.image}">
                </div>
                <div class="product-details">
                    <p class="description">${prod.title}</p>
                    <p class="price">${prod.price} $</p>
                    <p class="price"><Strong>Description: </strong>${prod.description} $</p>
                    
                    
                 </div>
                </div>  
            </div>
        `;
      }
    });
  }


//   show product catogory wise

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let selectedCategories = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);
  
      let filteredProducts =
        selectedCategories.length === 0
          ? products
          : products.filter((product) =>
              selectedCategories.includes(product.category)
            );
  
      showProductOnDisplay(filteredProducts);
    });
  });
  

  logout.addEventListener("click", () => {
    console.log("logout Click");
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, isLogin: false })
    );
    window.location.href = "/login/login.html";
  });
})();
