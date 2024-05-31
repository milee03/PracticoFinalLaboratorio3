document.addEventListener('DOMContentLoaded', function() {
    var urlBase = 'https://api.yumserver.com/16752/products';

    document.getElementById('btnmostrar').addEventListener('click', function(){
        fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(MostrarProductos)
        .catch(error => console.error('Error:', error));

        function MostrarProductos(productos){
            let html = ``;
            for (let i = 0; i < productos.length; i++){
              html += `
                 <tr>
                     <td>${productos[i].idcod}</td>
                     <td>${productos[i].titulo}</td>
                     <td>${productos[i].precioPeso}</td>
                     <td>${productos[i].precioDolar}</td>
                     <td>${productos[i].fecha}</td>
                     <td></td>
                 </tr>
               `; 

               document.getElementById('productosCargados').innerHTML = html;
            }
        }
    })
});

