console.log("first");
//////////////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉!

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;

3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier; 

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉)

5. After the second image has loaded, pause execution for 2 seconds again;

6. After the 2 seconds have passed, hide the current image!

TEST DATA: Images are in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* 
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.
*/

const createImage = (imgPath) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    // img.setAttribute("src", imgPath); // OR set the src attribute directly:
    img.src = imgPath;
    // console.log(img.getAttribute("src")); // OR Log the image source directly:
    console.log(img.src); // Log the image source

    img.addEventListener("load", () => {
      // img.classList.add("images");
      document.querySelector(".images").appendChild(img); // Append to the DOM
      // img.classList.add("images").appendChild(img); // Append to the DOM
      resolve(img); // Resolve the promise with the image element
    });

    img.addEventListener("error", (err) => {
      reject(new Error("Image failed to load: " + err.message)); // Reject the promise on error
    });
    // (img) => resolve(img);
    // (err) => reject(err);
  });
};

/* 
PART 2
2. Consume the promise using .then and also add an error handler;

3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier; 

4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉)

5. After the second image has loaded, pause execution for 2 seconds again;

6. After the 2 seconds have passed, hide the current image!

TEST DATA: Images are in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
*/
// const imagePath = "./img/img-1.jpg";

const wait = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

//////////// MY ANSWER ///////////////////////
// wait(2)
//   .then(() => {
//     createImage("./img/img-1.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = "none";
//     return wait(2);
//   })
//   .then(() => {
//     createImage("./img/img-2.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = "none";
//     return wait(2);
//   })
//   .then(() => {
//     createImage("./img/img-3.jpg");
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = "none";
//   });
//////////// MY ANSWER ///////////////////////

//////////// CHAT GPT ANSWER ///////////////////////
let currentImg;
createImage("./img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("./img/img-3.jpg");
  })
  .then((img) => {
    currentImg = img;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => {
    console.error("Error loading image:", err);
  });
//////////// CHAT GPT ANSWER ///////////////////////
