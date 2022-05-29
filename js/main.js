document.querySelector('button').addEventListener('click', getDetails)


async function getDetails(){
    try{
        const userName = document.querySelector('input').value.toLowerCase()
        const res = await fetch(`/api?student=${userName}`)
        const data = await res.json()

        console.log(data)
        document.querySelector('h2').innerText = data.name
        document.querySelector('h3').innerText = data.status
        document.querySelector('h4').innerText = data.currentOccupation



    }catch (error) {
        console.error(error)
        }
    }
    