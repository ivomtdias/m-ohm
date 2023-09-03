const eventSource = new EventSource('/stream');
//const timestamp = document.getElementById('timestamp')
const cpuName = document.getElementById('cpu-name');
const cpuTemperatureProgress = document.getElementById('cpu-temperature-progress');
const cpuTemperatureValue = document.getElementById('cpu-temperature-value');
const cpuPercentValue = document.getElementById("cpu-percent-value");
const cpuPercentProgress = document.getElementById("cpu-percent-progress");
const gpuName = document.getElementById('gpu-name');
const gpuTemperatureProgress = document.getElementById('gpu-temperature-progress');
const gpuTemperatureValue = document.getElementById('gpu-temperature-value');
const gpuMemoryProgress = document.getElementById('gpu-memory-progress');
const gpuMemoryValue = document.getElementById('gpu-memory-value');
const gpuPercentValue = document.getElementById("gpu-percent-value");
const gpuPercentProgress = document.getElementById("gpu-percent-progress");
const ramPercentValue = document.getElementById("ram-percent-value");
const ramPercentProgress = document.getElementById("ram-percent-progress")

const cardInfoDetailsDisk = document.getElementById('card-info-details-disk');

const CPU_MAX_TEMPERATURE_VALUE = 90;
const GPU_MAX_TEMPERATURE_VALUE = 100;

function populateCpuCard(eventData){
    cpuName.textContent = eventData.cpu.cpu_name;
    gpuName.textContent = eventData.gpu.gpu_name;

    temperaturePercentage = eventData.cpu.cpu_temp / CPU_MAX_TEMPERATURE_VALUE * 100;
    //cpuTemperatureProgress = temperaturePercentage + '%';
    cpuPercentValue.textContent = `${eventData.cpu.cpu_percent}%`
    cpuPercentProgress.style.background = `conic-gradient(#00A4FD ${eventData.cpu.cpu_percent * 3.6}deg, #ededed 0deg)`
    cpuTemperatureValue.textContent = `${eventData.cpu.cpu_temp} °C`;
}

function populateGpuCard(eventData){
    percentage = eventData.gpu.gpu_temp / GPU_MAX_TEMPERATURE_VALUE * 100;
    gpuTemperatureProgress.style.width = percentage + '%'
    gpuPercentValue.textContent = `${eventData.gpu.gpu_load}%`
    //timestamp.textContent = eventData.timestamp;
    gpuPercentProgress.style.background = `conic-gradient(#00A4FD ${eventData.gpu.gpu_load * 3.6}deg, #ededed 0deg)`
    gpuTemperatureValue.textContent = `${eventData.gpu.gpu_temp} °C`;

    percentage = eventData.gpu.gpu_memory_used / eventData.gpu.gpu_memory_total * 100;
    gpuMemoryProgress.style.width = percentage + '%';
    gpuMemoryValue.textContent = `${eventData.gpu.gpu_memory_used} MB`;
}

function populateRamCard(eventData){
    ramPercentProgress.style.background = `conic-gradient(#00A4FD ${eventData.ram.ram_percent * 3.6}deg, #ededed 0deg)`
    ramPercentValue.textContent = `${eventData.ram.ram_percent}%`;
}

function buildHtmlDiskCard(element, i){
    document.getElementById('card-info-details-disk').insertAdjacentHTML("beforeend", `
    <div id="disk-usage-info-` + i + `"class="key-value-bot">
        <div id="disk-partition-name-` + i + `">` + element.disk_device + `</div>
        <div class="details">
            <div class="progress-container">
                <div class="progress-bar" id="disk-usage-used-progress-` + i + `"></div>
            </div>
            <div class="key-value">
                <div id="disk-usage-used-value-` + i + `">` + element.disk_used + ` GB</div>
                <div id="disk-usage-used-percent-` + i + `">` + element.disk_percent + `%</div>
            </div>
        </div>
    </div>
    `);
}

function populateDiskCard(eventData){
    eventData.disk.forEach(function(element, i)  {
        if(document.getElementById("disk-usage-info-" + i) == null){ // does not exist
            buildHtmlDiskCard(element, i);
        }
        percentage = element.disk_used / element.disk_total * 100;
        document.getElementById("disk-usage-used-progress-" + i).style.width = percentage + '%';
    });
}

eventSource.onmessage = (event) => {
    let eventData = JSON.parse(event.data)
    populateCpuCard(eventData);
    populateGpuCard(eventData);
    populateRamCard(eventData);
    populateDiskCard(eventData);
};