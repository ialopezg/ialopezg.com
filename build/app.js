// getting canvas
let canvas = document.querySelector("#canvas")
let context = canvas.getContext("2d")

//making the canvas full screen
canvas.height = window.innerHeight
canvas.width = window.innerWidth

//chinese characters - taken from the unicode charset
let matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
//converting the string into an array of single characters
matrix = matrix.split("")

let font_size = 10
let columns = canvas.width/font_size //number of columns for the rain
//an array of drops - one per column
let drops = []
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++)
    drops[x] = 1

//drawing the characters
function draw() {
    //Black background for the canvas
    // translucent background to show trail
    context.fillStyle = "rgba(0, 0, 0, 0.04)"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = "#28a745";//green text
    context.font = font_size + "px arial"
    //looping over drops
    for(let i = 0; i < drops.length; i++) {
        // A random chinese character to print
        let text = matrix[Math.floor(Math.random() * matrix.length)]
        context.fillText(text, i * font_size, drops[i] * font_size)

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i] * font_size > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
        }

        //incrementing Y coordinate
        drops[i]++
    }
}

setInterval(draw, 35);

/**
 * Clear a form.
 *
 * @param form Object to clear.
 */
const clearForm = form => {
    Array.from(form.elements).forEach(element => {
        if (element.type === 'select-one' || element.type === 'select-multiple') {
            element.selectedIndex = -1
        } else if (element.type === 'checkbox' || element.type === 'radio') {
            element.checked = element.defaultChecked
        } if (element.type === 'hidden' || element.type === 'password' || element.type === 'text' || element.type === 'textarea') {
            element.value = ''
        }
    })
}

/**
 * Get all form data into a the provided form.
 *
 * @param form Form to be evaluated.
 * @returns Array An array containing the form data requested.
 */
const formData = form => {
    let data = {}
    Array.from(form.elements).filter(element => element.type !== 'submit')
        .map(element => {
            if (element.type === 'select-one' || element.type === 'select-multiple') {
                data[element.name] = element.options[element.selectedIndex].value
            }
            if (element.type === 'hidden' || element.type === 'password' || element.type === 'text'
                || element.type === 'email' || element.type === 'textarea') {
                data[element.name] = element.value
            }
            if (element.type === 'checkbox' || element.type === 'radio') {
                data[element.name] = element.checked
            }
        })

    return data
}

/*
 * Determines if a form is dirty by comparing the current value of each element
 * with its default value.
 *
 * @param form The form to be checked.
 * @param {String} validationRule Control to be excluded from the validation.
 *
 * @return {Boolean} <code>true</code> if the form is dirty, <code>false</code>
 *                   otherwise.
 */
const formDirty = (form, validationRule = '') => {
    let dirty = true

    Array.from(form.elements).forEach(element => {
        const type = element.type
        const rule = !(validationRule === '' || validationRule === 'undefined' || validationRule === 'null')
        let current
        const required = element.required === true

        if ((type === 'checkbox' || type === 'radio') && element.required) {
            // checkbox or radio validation
            if (element.required && element.checked !== element.defaultChecked) {
                current = true
            } else {
                current = element.checked !== element.defaultChecked
            }
            if (!current && rule) {
                element.classList.add(validationRule)
            } else if (current && rule) {
                element.classList.remove(validationRule)
            }

            dirty = dirty && current
        }
        if (type === 'hidden' || type === 'password' || type === 'text' || type === 'textarea') {
            // inputs [type: hidden, password, text] and textarea
            if (element.required && element.value !== '') {
                current = true
            } else {
                current = element.value !== '';
            }
            if (!current && rule) {
                element.classList.add(validationRule)
            } else if (current && rule) {
                element.classList.remove(validationRule)
            }

            dirty = dirty && current
        }
        if (type === 'select-one' || type === 'select-multiple') {
            // select [select-one, select-multiple]
            if (element.required && element.selectedIndex > 0) {
                current = true
            } else {
                current = element.selectedIndex > 0;
            }
            if (!current && rule) {
                element.classList.add(validationRule)
            } else if (current && rule) {
                element.classList.remove(validationRule)
            }

            dirty = dirty && current
        }
    })

    return dirty;
}

/**
 * Whether if controls in form object specified will be enable.
 *
 * @param form Object to enable or disable.
 * @param value Value to be assigned.
 */
const formEnabled = (form, value) => {
    Array.from(form.elements).forEach(element => element.disabled = !value)
}

const doAction = async(url, method = 'GET', headers = {}, data = null) => {
    let response
    if (method === 'GET') {
        return await fetch(url, {
            method: method,
            headers: headers
        })
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(response => {
                return response
            })
    } else {
        try {
            // fetch to server
            response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const data = await response.json(); // Get JSON value from the response body

                return Promise.resolve(data);
            } else {
                return Promise.resolve(data);
            }
        } catch (error) {
            return Promise.reject('*** Resource requested not found ***');
        }

    }
}