        function calculateTotal() {
            const ether1 = parseInt(document.getElementById('ether1').value) || 0;
            const ether2 = parseInt(document.getElementById('ether2').value) || 0;
            const ether3 = parseInt(document.getElementById('ether3').value) || 0;
            const ether4 = parseInt(document.getElementById('ether4').value) || 0;

            
            const result1 = ether1 * 27;
            const result2 = ether2 * 9;
            const result3 = ether3 * 3;
            const result4 = ether4 * 1;

            
            document.getElementById('result1').textContent = result1.toLocaleString('ua-UA');
            document.getElementById('result2').textContent = result2.toLocaleString('ua-UA');
            document.getElementById('result3').textContent = result3.toLocaleString('ua-UA');
            document.getElementById('result4').textContent = result4.toLocaleString('ua-UA');

           
            const total = result1 + result2 + result3 + result4;
            document.getElementById('totalResult').textContent = total.toLocaleString('ua-UA');
        }

        function resetCalculator() {
            document.getElementById('ether1').value = '0';
            document.getElementById('ether2').value = '0';
            document.getElementById('ether3').value = '0';
            document.getElementById('ether4').value = '0';
            calculateTotal();
        }

        
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('input[type="number"]');
            
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    let value = parseInt(this.value) || 0;
                    value = Math.min(Math.max(value, 0), 9999);
                    this.value = value;
                    calculateTotal();
                });

                input.addEventListener('focus', function() {
                    if (this.value === '0') {
                        this.value = '';
                    }
                });

                input.addEventListener('blur', function() {
                    if (this.value === '') {
                        this.value = '0';
                        calculateTotal();
                    }
                });
            });

            
            calculateTotal();
        });