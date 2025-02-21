document.addEventListener('DOMContentLoaded', function() {
    const userTimeZone = moment.tz.guess();

   
    function updateTime() {
        const now = moment().tz(userTimeZone);
        document.getElementById('current-time').textContent = now.format('dddd, LL, HH:mm:ss');
    }
    setInterval(updateTime, 1000);
    updateTime();

    
    const currentDay = moment().tz(userTimeZone).day();
    
    
    const rows = document.querySelectorAll('.schedule-table tbody tr');
    
   
    rows.forEach(row => {
       
        const cells = row.querySelectorAll('td');
        
       
        const dayIndex = currentDay === 0 ? 7 : currentDay;
        
       
        if (cells[dayIndex]) {
            cells[dayIndex].classList.add('highlight');
        }
    });

   
    document.querySelectorAll('.schedule-time').forEach(function(cell) {
        const originalHTML = cell.innerHTML;
        const lines = originalHTML.split(/<br\s*\/?>/);
        const convertedLines = lines.map(function(line) {
            line = line.trim();
            if (!line) return "";
            
            const match = line.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})(.*)/);
            if (match) {
                const startStr = match[1];
                const endStr = match[2];
                const extra = match[3] || "";
                
                const todayNewZone = moment().tz("Europe/Kiev").format("YYYY-MM-DD"); 
                let startNewZone = moment.tz(`${todayNewZone} ${startStr}`, "YYYY-MM-DD HH:mm", "Europe/Kiev");
                let endNewZone = moment.tz(`${todayNewZone} ${endStr}`, "YYYY-MM-DD HH:mm", "Europe/Kiev");
                
                if (endNewZone.isBefore(startNewZone)) {
                    endNewZone.add(1, 'day');
                }
                
                const startLocal = startNewZone.clone().tz(userTimeZone).format("HH:mm");
                const endLocal = endNewZone.clone().tz(userTimeZone).format("HH:mm");
                
                return `${startLocal}-${endLocal}${extra}`;
            } else {
                return line;
            }
        });
        
        cell.innerHTML = convertedLines.join('<br>');
    });
});
