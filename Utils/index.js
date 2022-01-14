const megadb = require('megadb');
const ram = new  megadb.crearDB('ram', 'Stats-for-Arcadia-Bots')
const cpud = new megadb.crearDB('cpu', 'Stats-for-Arcadia-Bots')

/**
 * @param {String} status Estado que retorna la discord api
 * @param {String} name nombre del bot para verificar sus datos
 * @param {cpud} database
 * @returns {String}
 */
 function getStatus(status) {
    let statusExt = ''
    switch (status) {
        case 'offline':
		case null:
        statusExt = '🔴 | OFFLINE'
        break;
        case 'online':
        case 'dnd':
        case 'idle':
        statusExt = '🟢 | ONLINE'
        break;
		case '':
		statusExt = '🟡 | DESCONOCIDO'
		break;
    }
    return statusExt;
}
/**
 * 
 * @param {String} name 
 * @returns {Promise}
 */
async function getRam(name) {
    let ramusage = 0
    let totalram = 0
    switch (name) {
        case 'ArcadiaBot':
            if(!ram.tiene(name)) {
                ramusage = "null"
                totalram = "null"
            } else {
                ramusage = await ram.obtener('ArcadiaBot' + ".UsageRam")
                totalram = await ram.obtener('ArcadiaBot' + ".TotalRam")
            }
        break;
        case 'ArcadiaSecurity':
            if(!ram.tiene(name)) {
                ramusage = "null"
                totalram = "null"
            } else {
                ramusage = await ram.obtener('ArcadiaSecurity' + ".UsageRam")
                totalram = await ram.obtener('ArcadiaSecurity' + ".TotalRam")
            }
        break;        
        case 'ArcadiaTickets':
        if(!ram.tiene(name)) {
            ramusage = "null"
            totalram = "null"
        } else {
            ramusage = await ram.obtener('ArcadiaTickets' + ".UsageRam")
            totalram = await ram.obtener('ArcadiaTickets' + ".TotalRam")
        }
    break;
    }
    const stats = {
        RamUsage: ramusage,
        TotalRam: totalram
    }
    return stats;
}


/**
 * 
 * @param {String} name 
 * @returns {Promise<UsageCpu>} CpuUsage
 */
async function getCpu(name) {
    let cpuusage = 0
    switch (name) {
        case 'ArcadiaBot':
            if(!cpud.tiene(name)) {
                cpuusage = "null"
            } else {
                cpuusage = await cpud.obtener('ArcadiaBot' + ".UsageCpu")
            }
        break;
        case 'ArcadiaSecurity':
            if(!cpud.tiene(name)) {
                cpuusage = "null"
            } else {
                cpuusage = await cpud.obtener('ArcadiaSecurity' + ".UsageCpu") 
            }
        break;        
        case 'ArcadiaTickets':
        if(!cpud.tiene(name)) {
            cpuusage = "null" 
        } else {
            cpuusage = await cpud.obtener('ArcadiaTickets' + ".UsageCpu") 
        }
    break;
    }
    const stats = {
        CpuUsage: cpuusage
    }
    return stats;
}

function memory(bytes = 0) {
    const gigaBytes = bytes / 1024 ** 3;  
    
    if(gigaBytes > 1) { 
        return `${gigaBytes.toFixed(1)} GB`;  
    }

    const megaBytes = bytes / 1024 ** 2;  
    
    if(megaBytes < 10) return `${megaBytes.toFixed(2)} MB`; 
    
        
    if(megaBytes < 100) return `${megaBytes.toFixed(1)} MB`; 

        
    return `${Math.floor(megaBytes)} MB`;  
}

/**
 * @param {JSON} data 
 * @returns {Promise<String>}
 */
async function getStatusMinecraft(data) {
    const status = data.online
    let color = ''
    let statusExt = ''
    let statusIf = false 
    switch (status) {
        case false:
            color = 'RED'
            statusExt = '🔴 | OFFLINE'
            statusIf = false
            break;
    
        case true:
            color = 'GREEN',
            statusExt = '🟢 | ONLINE'
            statusIf = true
            break;
    }
    const returns = {
        Color: color,
        Status: statusExt,
        StatusIf: statusIf
    }
    return returns
}
module.exports = {
    getCpu,
    getRam,
    getStatus,
    getStatusMinecraft,
    memory,
}