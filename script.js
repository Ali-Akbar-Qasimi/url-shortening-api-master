let burger = document.querySelector('.burger')
let links = document.querySelector('.links')
burger.addEventListener('click',()=>{
    links.classList.toggle('show')
})


// shorting the url

let parentContainer = document.querySelector('.shorted-urls-container')

let input = document.querySelector('.url-shorter-input')

let button = document.querySelector('.url-shorter-btn')

function shortURL(){
    fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    .then(res => res.json())
    .then(data =>{
        if(!data.ok){
            input.classList.add('bad-massege')
            input.value = null
            return
        }
        input.classList.remove('bad-massege')
        console.log(data)
        createURLcontainer(data.result.full_short_link)
        input.value = null
    })
    .catch(err=>{
        console.log(err)
        
    })
}
button.addEventListener('click',shortURL)

function createURLcontainer(shorted_url){

    let container = document.createElement('div')
    container.classList.add('shorted-url-container')
    let url = document.createElement('p')
    url.classList.add('url')
    url.textContent = input.value
    let hr = document.createElement('hr')
    let shorted_url_element = document.createElement('p')
    shorted_url_element.classList.add('shorted-url')
    shorted_url_element.textContent = shorted_url
    let copyButton = document.createElement('button')
    copyButton.classList.add('copy-btn')
    copyButton.textContent = 'Copy'
    copyButton.addEventListener('click',copyText)
    function copyText(ev){
        copyButton.textContent = 'Copied'
        copyButton.classList.add('copied')
        let text = shorted_url_element.innerText;
        let textArea  = document.createElement('textarea');
        textArea.width  = "1px"; 
        textArea.height = "1px";
        textArea.background =  "transparents" ;
        textArea.value = text;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    container.append(url)
    container.append(hr)
    container.append(shorted_url_element)
    container.append(copyButton)

    parentContainer.append(container)
}