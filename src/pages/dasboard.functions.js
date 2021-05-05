function toHTML(id, name, openDate, date) {
    return `
    <li class="db__record">
    <a href="#excel/${id}">${name}</a>
        <span>
            <strong>${openDate}</strong> 
            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
            <strong>${date}</strong>
        </span>
    </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i=0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
        
    return keys
}

export function createRecords() {
    const keys = getAllKeys().sort((a, b) => b.split(':')[1] - a.split(':')[1])

    if (keys.length) {
        const tables = []
        for (let key of keys) {
            const id = key.split(':')[1]
            const name = JSON.parse(localStorage[key]).headerState

            const date = new Date(+id).toLocaleDateString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            })

            const openDate = JSON.parse(localStorage[key]).openedDate
            
            tables.push(toHTML(id, name, openDate, date))
        }
        return tables.join('')
    }

    return `<p>Вы пока не создали ни одной таблицы</p>`
}
