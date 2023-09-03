import GPUtil, psutil, datetime, cpuinfo

def fetchInformation():
    gpu = GPUtil.getGPUs()[0]

    disk = []
    
    for index, partition in enumerate(psutil.disk_partitions()):
        # print(partition.device)
        info = {}
        info['disk_device'] = partition.device
        info['disk_total'] = round(psutil.disk_usage(partition.device).total / 1024 / 1024 / 1024, 2)
        info['disk_used'] = round(psutil.disk_usage(partition.device).used / 1024 / 1024 / 1024, 2)
        info['disk_free'] = round(psutil.disk_usage(partition.device).free / 1024 / 1024 / 1024, 2)
        info['disk_percent'] = psutil.disk_usage(partition.device).percent
        #disk['partition_'+str(index)] = info
        disk.append(info)


    message = {
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "general": {
            "boot_time": datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S")
        },
        "cpu": {
            "cpu_name": cpuinfo.get_cpu_info()['brand_raw'],
            "cpu_temp": -1,
            "cpu_percent": psutil.cpu_percent()
        },
        "gpu": {
            "gpu_name": gpu.name,
            "gpu_temp": gpu.temperature,
            "gpu_memory_free": gpu.memoryFree,
            "gpu_memory_total": gpu.memoryTotal,
            "gpu_memory_used": gpu.memoryUsed,
            "gpu_load": round(gpu.load * 100, 1)
        },
        "ram": {
            "ram_total": round(psutil.virtual_memory().total / 1024 / 1024 / 1024, 2),
            "ram_available": round(psutil.virtual_memory().available / 1024 / 1024 / 1024, 2),
            "ram_used": round(psutil.virtual_memory().used / 1024 / 1024 / 1024, 2),
            "ram_percent": psutil.virtual_memory().percent
        },
        "disk": disk
    }

    return message;