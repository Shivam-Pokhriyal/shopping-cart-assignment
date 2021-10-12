import {fetchData} from './utils'
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}
  
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    console.log(slides);
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

const getHomePageData=async()=>{
    const bannerData= await fetchData('banners');
    const categoriesData= await fetchData('categories')
    createBanner(bannerData);
    showSlides(1);
    createCategories(categoriesData);
    const prev=document.querySelector(".prev");
    prev.addEventListener("click",()=>plusSlides(-1));
    const next=document.querySelector(".next");
    next.addEventListener("click",()=>plusSlides(1))
}
const createBanner=(banners)=>{
    let slideShow=document.querySelector(".slideshow-container");
    let dotContainer=document.querySelector("#slideshow-dots");
    banners.forEach((banner,index)=>{
      let slideShowBanner= document.createElement("div");
      slideShowBanner.className="mySlides fade";
      //create image
      let bannerImg= document.createElement("img");
      bannerImg.src=banner.bannerImageUrl;
      bannerImg.alt=banner.bannerImageAlt;
      bannerImg.style.width="100%";
  
      let dot= document.createElement("span");
      dot.className="dot"
      dot.addEventListener("click", () => currentSlide(index+1));
      //append children
      slideShowBanner.appendChild(bannerImg);
      slideShow.appendChild(slideShowBanner);
      dotContainer.appendChild(dot);
    });
  }
  const createCategories = (categories) => {
    const categoriesSection = document.getElementById('categories');
    categories = categories.filter((item) => item.enabled);
    categories.map((category, index) => {
      const { description, imageUrl, name, key } = category;
  
      const article = document.createElement('article');
      if (index % 2 === 0) {
        article.classList = 'flex flex-jc-sa category curved';
      } else
        article.classList = 'flex flex-row-reverse flex-jc-sa category curved';
  
      const categoryImg = document.createElement('img');
      categoryImg.classList = 'img-cat';
      categoryImg.src = imageUrl;
      categoryImg.alt = name;
  
      article.appendChild(categoryImg);
  
      const categoryInfo = document.createElement('div');
      categoryInfo.classList = 'category-info';
  
      const h2 = document.createElement('h2');
      h2.innerText = name;
  
      const p = document.createElement('p');
      p.innerText = description;
  
      const button = document.createElement('button');
      button.type = 'button';
      button.classList = 'button-primary';
      button.innerText = `Explore ${key}`;
  
      categoryInfo.appendChild(h2);
      categoryInfo.appendChild(p);
      categoryInfo.appendChild(button);
      article.appendChild(categoryInfo);
      categoriesSection.appendChild(article);
    });
  };

  getHomePageData();