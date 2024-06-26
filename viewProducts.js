document.addEventListener('DOMContentLoaded', function() {
    var urlBase = 'https://api.yumserver.com/16752/products';
    var tablaProductos = document.getElementById('contenedorTabla');
    console.log(tablaProductos)
    //MUESTRA TODOS LOS PRODUCTOS.
    
        //HAGO VISIBLE LA TABLA
        tablaProductos.style.display = 'block';
        fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error');
            }
            return response.json();
        })
        .then(productos => {
            MostrarProductos(productos);
        })
        .catch(error => console.error('Error:', error));
    

   //MUESTRA PRODUCTOS FILTRADOS.
    document.getElementById('btnfiltro').addEventListener('click', function(){
        tablaProductos.style.display = 'block';
        var nombreBusqueda = document.getElementById('filtro').value.trim();

        fetch(urlBase)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error');
            }
            return response.json();
        })
        .then(productos => {
            // FILTRO POR EL NOMBRE BUSCADO
            if (nombreBusqueda !== '') {
                productos = productos.filter(producto => producto.titulo.toLowerCase().includes(nombreBusqueda.toLowerCase()));
                MostrarProductos(productos);
            }
            else{
                alert("Ingresa un nombre a buscar.")
            }
        })
        .catch(error => console.error('Error:', error));
    })

    function FormateoImportes(importe) {
        // Convertir el número a string y separar los decimales
        const partes = Number(importe).toFixed(2).split('.');
        const pesos = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${pesos},${partes[1]}`;
    }
    
    function MostrarProductos(productos) {

        let html = ``;
        for (let i = 0; i < productos.length; i++) {
            const fechaProducto = productos[i].fecha;
            const fechaPartes = fechaProducto.split('-');
            const anio = fechaPartes[0];
            const mes = fechaPartes[1];
            const dia = fechaPartes[2];
            const fechaFormateada = `${dia}/${mes}/${anio}`;

             // Formateo de precios utilizando la función formateoImportes
             const precioPesoFormateado = FormateoImportes(productos[i].precioPeso);
             const precioDolarFormateado = FormateoImportes(productos[i].precioDolar);

            html += `
                <tr style='height: 50px;'>
                    <td>${productos[i].idcod}</td>
                    <td>${productos[i].titulo}</td>
                    <td>$ ${precioPesoFormateado}</td>
                    <td>U$S ${precioDolarFormateado}</td>
                    <td>${fechaFormateada}</td>
                    <td>
                        <button class='eliminar btn btn-danger' data-id='${productos[i].idcod}' type='button' abbr title='Eliminar producto'><i class='fa-solid fa-trash'></i></button>
                        <button class='editar btn btn-primary' data-id='${productos[i].idcod}' type='button' abbr title='Editar producto'><i class='fa-solid fa-pen'></i></button>
                    </td>
                </tr>
            `;
        }
    
        document.getElementById('productosCargados').innerHTML = html;

        //SELECCIONO EL BOTON ELIMINAR Y OBTENGO EL ID DE LA FILA QUE NECESITO PARA USARLO COMO PARAMETRO EN EL METODO eliminarProducto.
        let botonesEliminar = document.querySelectorAll('.eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', function() {
                let idProducto = this.getAttribute('data-id');
                eliminarProducto(idProducto);
            });
        });

       //SELECCIONO EL BOTON EDITAR Y OBTENGO EL ID DE LA FILA QUE NECESITO PARA USARLO COMO PARAMETRO EN EL METODO editarProducto. 
        let botonesEditar = document.querySelectorAll('.editar');
        botonesEditar.forEach(boton => {
            boton.addEventListener('click', function() {
                let idProducto = this.getAttribute('data-id');
                editarProducto(idProducto);
            });
        });
    }
    
    function eliminarProducto(idProducto) {
        // PREGUNTO SI REALMENTE QUIERE ELIMINARLO..
        if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            // Hacer una solicitud DELETE a la API para eliminar el producto con el id 'idProducto'
            fetch(urlBase, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idcod: idProducto,
                    })
                })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Producto eliminado exitosamente');
                window.location.href = 'viewproduct.html'; 
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
        } else {
            console.log('Operación de eliminación cancelada por el usuario');
        }
    } 
    
    function editarProducto(idProducto) {
        // Redirigir a la página de edición con el ID del producto como parámetro en la URL
        window.location.href = `editproduct.html?id=${idProducto}`;
    }
   
});

