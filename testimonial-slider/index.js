const testimonials = [
    {
        photourl: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVufGVufDB8fDB8fHww",

        text: "The quality of Taqwa Wear products is outstanding. The fabric feels premium and the designperfectly blends tradition with modern style. I wear their kufis daily and absolutely love them.",
        name: " — Ahmed Raza"
    },
    {
        photourl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        text: "I ordered a prayer cap and was impressed by the comfort and stitching. It fits perfectly and looks elegant. Taqwa Wear has become my go-to for Islamic accessories.",
        name: " — Osman Khalid"
    },
    {
        photourl: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",

        text: "Excellent service and beautiful products. The attention to detail really shows in every item. Highly recommended for anyone looking for quality and style.",
        name: " — Yousaf Aziz"
    }

]

const imgEl = document.querySelector("img");
const textEl = document.querySelector(".text");
const nameEl = document.querySelector(".name");

let indx = 0;
updateTestimonial();



function updateTestimonial() {
    const { photourl, name, text } = testimonials[indx];
    imgEl.src = photourl;
    textEl.innerText = text;
    nameEl.innerText = name;
    indx++;
    if (indx === testimonials.length) {
        indx = 0;
    }

    setTimeout(() => {
        updateTestimonial();

    }, 10000);


}

