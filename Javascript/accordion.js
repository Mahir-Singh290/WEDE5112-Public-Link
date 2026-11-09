 /* 
References & Technical Documentation Sources:
- MDN Web Docs. (2026). Document: querySelectorAll() method. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
- MDN Web Docs. (2026). EventTarget: addEventListener() method. Mozilla Developer Network. Retrieved November 3, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- W3Schools. (2026). JavaScript HTML DOM Element classList. W3Schools Online Web Tutorials. Retrieved November 3, 2026, from https://www.w3schools.com/jsref/prop_element_classlist.asp
*/
 
 
 
 //Step 1: Select all the accordion buttons
    const accordions = document.querySelectorAll(".accordion"); //It selects all the code with the name accordion

    //Step 2:Loop through each button
    accordions.forEach((accordion)=>
    {
        //Step 3: Adding a click event
        accordion.addEventListener("click",()=>{

            //Step 4: Finding the content panel
            const panel = accordion.nextElementSibling;

            //Step 5: Checks if the panel is open
            const isOpen = 
            accordion.classList.contains("active");

            //Step 6: close all accordions
            //The purpose of this loop is to close all the accordion sections
            //this ensures one accordion is open at a time

            accordions.forEach((item)=>{


                //removes the "active" css class from the current accordion button
                item.classList.remove("active");



                //Updates the aria-expanded attribute
                //it tells screen readers, whethere the accordion is expanded or closed
                //false means it is closed
                item.setAttribute("aria-expanded", "false");


                //Finds the content panel associated with the current accordion button
                //the panel is the next HTML element straight after the button
                const itemPanel = item.nextElementSibling;



                //Removes the "open" css class from the content panel
                itemPanel.classList.remove("open");

                //Resets the panels maximum height
                //After the panel collapses its content will become hidden
                itemPanel.style.maxHeight = null;
            });

            //step 7: Open the clicked accordion
            //only if it was previously closed
            if(!isOpen){
                accordion.classList.add("active");

                accordion.setAttribute("aria-expanded", "true");

                panel.classList.add("open");
                panel.style.maxHeight = panel.scrollHeight + 30 + "px";

            }
        });

    });